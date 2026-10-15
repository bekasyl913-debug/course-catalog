# Course Catalog

Next.js frontend connected to the FastAPI Course Catalog API.

## Run both projects

Start the backend first, from course-catalog-api:

```powershell
.\.venv\Scripts\Activate.ps1
python -m uvicorn main:app --reload
```

In course-catalog, install dependencies:

```powershell
npm install
```

Create .env.local next to package.json:

```env
API_URL=http://localhost:8000
NEXT_PUBLIC_API_URL=http://localhost:8000
```

API_URL is used by server components.
NEXT_PUBLIC_API_URL is used by browser components.
.env.local is excluded from Git.

Start the frontend:

```powershell
npm run dev
```

Open http://localhost:3000/courses.
Use localhost, because the backend allows http://localhost:3000.

## Features

- /courses and /courses/[id] fetch data from FastAPI.
- Requests use cache: "no-store" and check res.ok.
- Unknown course IDs show the not-found page.
- /filter uses SWR and requests ?is_elective=true.
- The like button sends POST and displays the updated count.
- The enrollment form sends JSON and displays the enrollment ID.
- A one-character student name displays the server validation error.
- error.tsx shows Try again when the backend is unavailable.

## Decisions

generateStaticParams was removed so course IDs are not fetched
during the build. Course data is requested at runtime.

The like request has no JSON body or custom headers, so it does
not require a CORS preflight. Enrollment uses Content-Type:
application/json, so the browser sends OPTIONS before POST.

Likes and enrollments are stored in backend memory and reset
when the backend restarts.

## Verification performed

- Six courses loaded from the backend.
- A like increased the counter.
- Enrollment with one character was rejected.
- Enrollment with Bekasyl returned an enrollment ID.
- The elective checkbox showed two courses.
- Stopping the backend displayed error.tsx.
- Restarting it and clicking Try again restored the course list.
- npm run build completed successfully.
- Network showed like: 200 without preflight.
- Enrollment showed OPTIONS: 200 followed by POST: 201.

## Breakage journal

### 1 CORS middleware disabled

Change: commented out app.add_middleware.

Console: "No 'Access-Control-Allow-Origin' header is present
on the requested resource".

Network: course fetch was blocked by CORS; enrollment OPTIONS
returned 405 and the actual POST was not sent.
The backend returned 200 for GET /courses.
The server-rendered /courses page still worked.

Cause: no CORSMiddleware was installed.
Fix: restored the middleware.

### 2 Trailing slash in allowed origin

Change: allow_origins=["http://localhost:3000/"].

Observed: enrollment failed and OPTIONS returned 400.
A separate Console quote was not recorded.

Cause: the configured value did not match the browser origin.
Fix: removed the trailing slash.

### 3 Only GET allowed

Change: allow_methods=["GET"].

Observed: enrollment OPTIONS returned 400.
Response headers contained Access-Control-Allow-Methods: GET
and Access-Control-Allow-Origin: http://localhost:3000.
A separate Console quote was not recorded.

Cause: POST was not permitted by the preflight configuration.
Fix: restored allow_methods=["*"].

### Remaining required experiments

The different-host origin experiment and the Python KeyError
experiment were not performed.