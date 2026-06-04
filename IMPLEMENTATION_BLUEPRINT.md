# Department Website Implementation Blueprint

## 1. Product Direction

The website will become a premium, research-focused academic platform for the Department of Instrumentation and Control Engineering at COEP Technological University. The design language will combine the institutional clarity of IIT Bombay and IIT Madras, the editorial confidence of Stanford, and the structured research presentation patterns used by MIT and Harvard engineering departments.

The site will not behave like a generic brochure. It will behave like a department operating system: quick to scan, credible for external visitors, useful for students, and maintainable for faculty/admin teams.

Primary goals:
- Establish trust within the first viewport.
- Make academic, faculty, research, lab, and governance content easy to locate.
- Remove AI-generated visual inconsistency.
- Improve performance, accessibility, SEO, and security without changing the project stack.
- Preserve the existing React + TailwindCSS + Framer Motion architecture.

Primary audiences:
- Prospective students
- Current students
- Faculty and researchers
- Industry partners
- Recruiters
- Accreditation/review committees
- Alumni
- Department administrators

## 2. Information Architecture

Final navigation structure:

```text
Home
About the Department
  About
  Faculty
  Laboratories
  Research Projects
  Patents
Academics
  Curriculum
  Time Table
  STTPs / FDPs
Students & Career
  Internships and Placements
  Consultancy and Training
Administration & Governance
  BOS Committee and Minutes of Meeting
  Department Committees
Notices & Updates
  Circulars / Reports
Contact
```

Routing rules:
- `/` redirects to `/about`.
- Legacy routes redirect to their modern equivalents.
- All navigation links must resolve to valid routes.
- Placeholder pages must use production-grade content shells with clear title, purpose, and contact/action context.
- Every route must have a unique document title and meta description.

## 3. Visual Design System

### 3.1 Color Palette

Final palette:

```css
:root {
  --color-bg: #f6f8fb;
  --color-surface: #ffffff;
  --color-surface-soft: #eef3f7;
  --color-heading: #08111f;
  --color-text: #172033;
  --color-text-soft: #526174;
  --color-primary: #071a33;
  --color-primary-strong: #031123;
  --color-primary-soft: #e8eef6;
  --color-accent: #0f766e;
  --color-accent-soft: #e4f3f1;
  --color-highlight: #2457a6;
  --color-warning: #9a5b00;
  --color-danger: #b42318;
  --color-border: #d8e1ea;
  --color-border-strong: #aebdca;
  --shadow-soft: 0 18px 48px -30px rgba(8, 17, 31, 0.24);
  --shadow-panel: 0 28px 80px -44px rgba(8, 17, 31, 0.32);
}
```

Usage rules:
- Primary navy is used for navigation, headers, and major actions.
- Teal is used only for research/innovation emphasis and active states.
- Blue is used for data, links, and academic highlights.
- Backgrounds stay quiet and institutional.
- Avoid random gradients, decorative blobs, excessive roundness, and bright AI-like color stacks.

### 3.2 Typography

Final system:
- Sans: Manrope for interface, data, body copy.
- Serif: Playfair Display only for page-level display headings.

Scale:

```css
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: 1.125rem;
--text-xl: 1.25rem;
--text-2xl: 1.5rem;
--text-3xl: 1.875rem;
--text-4xl: 2.25rem;
--text-5xl: 3rem;
```

Rules:
- One `h1` per page.
- Hero heading: 40-56px desktop, 32-40px tablet, 28-34px mobile.
- Section heading: 28-40px desktop, 24-32px tablet, 22-28px mobile.
- Card heading: 18-24px.
- Body copy: 16px minimum.
- Small metadata: 12px minimum, uppercase only when short.
- Letter spacing must be 0 for normal text and max `0.18em` for short metadata labels.

### 3.3 Radius, Shadow, and Spacing

Radius:
- Buttons: 8px or full pill only for compact labels.
- Cards: 16px max.
- Modals: 20px max.
- Tables: 16px max.
- Avoid `rounded-[2rem]` unless used for a major panel.

Spacing:

```css
--page-max: 1320px;
--page-gutter: clamp(1rem, 3vw, 2rem);
--section-gap: clamp(2rem, 4vw, 4rem);
--section-gap-tight: clamp(1.25rem, 3vw, 2.5rem);
```

Layout rules:
- All pages use `.page-shell`.
- Top-level page content uses `.page-stack`.
- Major sections align to the same grid.
- No horizontal scroll on body.
- Tables scroll inside their own container.
- Cards must not sit inside decorative card containers.

## 4. Global Layout Structure

### Problem
Current layout mixes page-specific spacing, oversized rounded panels, and inconsistent section wrappers.

### Solution
Introduce one global layout rhythm.

### Implementation Method
- Keep `MainLayout`.
- Keep `NavBar`.
- Use `.page-shell` and `.page-stack` globally.
- Replace oversized panels with quieter academic sections.
- Ensure all child routes render inside `main#main-content`.

### Sample HTML Structure

```html
<body>
  <a href="#main-content">Skip to main content</a>
  <header>...</header>
  <main id="main-content">
    <section class="page-shell page-stack">...</section>
  </main>
  <footer>...</footer>
</body>
```

### Sample CSS Structure

```css
.page-shell {
  width: 100%;
  max-width: var(--page-max);
  margin-inline: auto;
  padding-inline: var(--page-gutter);
}

.page-stack {
  display: grid;
  gap: var(--section-gap);
}
```

### Sample React Component Structure

```jsx
export default function MainLayout({ children }) {
  return (
    <div className="min-h-dvh overflow-x-hidden bg-[var(--color-bg)]">
      <SkipLink />
      <NavBar />
      <main id="main-content">
        <div className="page-shell page-stack py-8 lg:py-10">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
```

### Accessibility Requirements
- Skip link visible on focus.
- `main` has `id="main-content"`.
- Header, nav, main, footer landmarks are semantic.

### SEO Requirements
- Every route updates title and meta description.
- Add canonical URL.
- Add breadcrumb JSON-LD.

### Expected Outcome
Cleaner vertical rhythm, less visual noise, no right-side clipping, improved scanability.

## 5. Navigation System

### Problem
Flat navigation creates cognitive load and weak orientation.

### Solution
Use grouped IA with desktop top navigation, desktop sidebar support, and mobile drawer with collapsible groups.

### Implementation Method
- Store navigation in JSON/config.
- Use active route detection for parent and child.
- Keep desktop dropdowns accessible with keyboard.
- Mobile uses Radix Dialog drawer and collapsible sections.

### Sample HTML Structure

```html
<header>
  <div class="brand-bar">COEP Technological University</div>
  <nav aria-label="Primary navigation">
    <button aria-expanded="false">About the Department</button>
  </nav>
</header>
```

### Sample CSS Structure

```css
.nav-link {
  height: 44px;
  border-radius: 8px;
  padding-inline: 12px;
}

.nav-link[data-active="true"] {
  background: var(--color-primary-soft);
  color: var(--color-primary);
}
```

### Sample React Component Structure

```jsx
export const NAV_GROUPS = [
  {
    id: "about",
    title: "About the Department",
    items: [
      { label: "About", path: "/about" },
      { label: "Faculty", path: "/faculty" },
      { label: "Laboratories", path: "/laboratories" },
      { label: "Research Projects", path: "/research-projects" },
      { label: "Patents", path: "/patents" },
    ],
  },
];
```

### Accessibility Requirements
- `aria-label="Primary navigation"`.
- Dropdown buttons use `aria-expanded`.
- Mobile drawer traps focus.
- Links have visible focus states.

### SEO Requirements
- Navigation links are real anchors through React Router.
- Breadcrumbs are visible and represented in JSON-LD.

### Expected Outcome
Navigation becomes easier to scan, more university-standard, and more mobile-friendly.

## 6. Homepage / About Page

Final page role: department homepage and about landing page.

### Desktop Wireframe

```text
+--------------------------------------------------------------------------------+
| Top Brand Bar + Primary Navigation                                             |
+--------------------------------------------------------------------------------+
| Hero: Department name, positioning, 2 CTAs              | Key metrics panel     |
| Instrumentation & Control Engineering                  | Faculty / Labs / IP   |
+--------------------------------------------------------------------------------+
| Research focus band: sensors / control / automation / biomedical instrumentation|
+--------------------------------------------------------------------------------+
| Why the department: mission, vision, outcomes                                   |
+--------------------------------------------------------------------------------+
| Featured faculty grid                                                           |
+--------------------------------------------------------------------------------+
| Labs and industry collaboration preview                                         |
+--------------------------------------------------------------------------------+
| Notices / updates / academic links                                              |
+--------------------------------------------------------------------------------+
| Footer                                                                          |
+--------------------------------------------------------------------------------+
```

### Tablet Wireframe

```text
+--------------------------------------------------+
| Brand + Menu                                     |
+--------------------------------------------------+
| Hero full width                                  |
| Metrics row 2x2                                  |
+--------------------------------------------------+
| Research focus 2 columns                         |
+--------------------------------------------------+
| Mission / Vision stacked                         |
+--------------------------------------------------+
| Faculty 2 columns                                |
+--------------------------------------------------+
```

### Mobile Wireframe

```text
+-----------------------------+
| Logo + Menu                 |
+-----------------------------+
| H1                          |
| Summary                     |
| Primary CTA                 |
| Secondary CTA               |
| Metrics 1 column            |
+-----------------------------+
| Focus areas cards           |
+-----------------------------+
| Faculty preview cards       |
+-----------------------------+
```

### Problem
Current hero and panels feel partially generated, with decorative effects and inconsistent spacing.

### Solution
Create a restrained, editorial academic homepage with real departmental signals.

### Implementation Method
- Hero uses clear H1 and concise supporting copy.
- Metrics use real data from local JSON.
- Replace decorative shapes with grid, border, and subtle surface changes.
- Use CTAs: "Explore Faculty", "View Laboratories".

### Sample React Component Structure

```jsx
function HomeHero({ metrics }) {
  return (
    <section className="grid gap-8 rounded-2xl border bg-white p-6 lg:grid-cols-[1.3fr_0.7fr] lg:p-10">
      <div>
        <p className="eyebrow">COEP Technological University</p>
        <h1>Department of Instrumentation and Control Engineering</h1>
        <p>Research-led teaching in sensing, control, automation, and intelligent systems.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button to="/faculty">Explore Faculty</Button>
          <Button variant="secondary" to="/laboratories">View Laboratories</Button>
        </div>
      </div>
      <StatsPanel metrics={metrics} />
    </section>
  );
}
```

### Accessibility Requirements
- One H1.
- CTA labels describe destination.
- Decorative imagery uses `alt=""`.

### SEO Requirements
- Title: `Instrumentation and Control Engineering | COEP Tech`.
- Description: `Explore faculty, laboratories, research, patents, academics, and student opportunities in COEP's Instrumentation and Control Engineering department.`

### Expected Outcome
Higher trust, stronger brand identity, better first-page scan.

## 7. Faculty Page

### Desktop Wireframe

```text
+----------------------------------------------------------------------------+
| Page Header: Faculty Directory + filters/search                             |
+----------------------------------------------------------------------------+
| Stats: Faculty / Publications / Patents / Recognitions                       |
+----------------------------------------------------------------------------+
| Faculty list: image | name, designation, research, metrics, actions          |
| Faculty list: image | name, designation, research, metrics, actions          |
+----------------------------------------------------------------------------+
```

### Tablet Wireframe

```text
+--------------------------------------------+
| Header + stats 2x2                         |
+--------------------------------------------+
| Faculty card stacked image + content       |
+--------------------------------------------+
```

### Mobile Wireframe

```text
+-----------------------------+
| Faculty Directory           |
| Search/filter               |
+-----------------------------+
| Faculty compact card        |
| View profile                |
+-----------------------------+
```

### Problem
Cards are visually rich but heavy, over-rounded, and may feel inconsistent with table pages.

### Solution
Create academic profile cards with clear hierarchy and compact metadata.

### Implementation Method
- Keep image aspect ratio fixed.
- Use badges sparingly.
- Add search by name, designation, research area.
- Keep stagger animation with reduced-motion support.

### Sample React Component Structure

```jsx
function FacultyCard({ faculty }) {
  return (
    <article className="grid overflow-hidden rounded-2xl border bg-white md:grid-cols-[220px_1fr]">
      <img src={faculty.image} alt={faculty.name} className="aspect-[4/5] h-full object-cover" />
      <div className="p-6">
        <p>{faculty.designation}</p>
        <h2>{faculty.name}</h2>
        <p>{faculty.research}</p>
        <FacultyMetrics faculty={faculty} />
        <Link to={`/faculty/${faculty.id}`}>View profile</Link>
      </div>
    </article>
  );
}
```

### Accessibility Requirements
- Faculty photos use real names in alt.
- Link text includes action and context.
- Cards do not rely only on hover.

### SEO Requirements
- Faculty profile route title includes faculty name.
- Add `Person` JSON-LD for profile pages.

### Expected Outcome
Faculty directory becomes credible, searchable, and easier to scan.

## 8. Faculty Profile Page

### Desktop Wireframe

```text
+----------------------------------------------------------------------------+
| Profile hero: photo, name, title, contact, document link                     |
+----------------------------------------------------------------------------+
| Tabs/select: Education | Experience | Publications | Patents | Achievements  |
+----------------------------------------------------------------------------+
| Active section content                                                       |
+----------------------------------------------------------------------------+
```

### Tablet Wireframe

```text
+--------------------------------------------+
| Photo + profile details stacked            |
| Section dropdown                           |
| Content cards                              |
+--------------------------------------------+
```

### Mobile Wireframe

```text
+-----------------------------+
| Photo                       |
| Name                        |
| Contact buttons             |
| Section selector            |
| Content list                |
+-----------------------------+
```

### Problem
Profile tabs have animation but inconsistent utility class names and content density.

### Solution
Use profile section selector with consistent card surfaces and real document resources.

### Implementation Method
- Keep Radix Select.
- Use Framer Motion only for section content.
- Use plain semantic lists for achievements/publications.

### Accessibility Requirements
- Section selector has accessible label.
- Previous/Next buttons disabled correctly.
- External document links use `rel="noreferrer"`.

### SEO Requirements
- Unique title per faculty.
- Structured data for name, affiliation, job title, email.

### Expected Outcome
Profiles become useful for accreditation, students, and collaborators.

## 9. Research / Publications Page

### Desktop Wireframe

```text
+----------------------------------------------------------------------------+
| Research catalog hero + metrics                                              |
+----------------------------------------------------------------------------+
| Intelligence/search panel                                                    |
+----------------------------------------------------------------------------+
| Filters                                                                      |
+----------------------------------------------------------------------------+
| Sticky sortable table with title links and details modal                      |
+----------------------------------------------------------------------------+
```

### Tablet Wireframe

```text
+--------------------------------------------+
| Hero and metrics 2 columns                 |
| Filters 2 columns                          |
| Table horizontal scroll                    |
+--------------------------------------------+
```

### Mobile Wireframe

```text
+-----------------------------+
| Search                      |
| Filters                     |
| Publication cards           |
| Pagination                  |
+-----------------------------+
```

### Problem
Research data is dense and table interactions need consistent behavior.

### Solution
Use searchable cards on mobile and sticky sortable tables on desktop.

### Implementation Method
- Desktop uses sortable table.
- Mobile uses cards.
- Details open in Radix Dialog.
- External links are explicit and labelled.

### Accessibility Requirements
- Sort buttons have `aria-label`.
- Details modal has title and description.
- Pagination buttons announce disabled state.

### SEO Requirements
- Research page title and description.
- Use `ScholarlyArticle` structured data where records have enough metadata.

### Expected Outcome
Research output becomes discoverable and credible.

## 10. Patents Page

### Desktop Wireframe

```text
+----------------------------------------------------------------------------+
| IP portfolio hero + stats                                                    |
+----------------------------------------------------------------------------+
| Filters                                                                      |
+----------------------------------------------------------------------------+
| Sticky sortable patent table                                                 |
+----------------------------------------------------------------------------+
| Quick view modal                                                             |
+----------------------------------------------------------------------------+
```

### Tablet Wireframe

```text
+--------------------------------------------+
| Stats 2x2                                  |
| Filters 2 columns                          |
| Scrollable table                           |
+--------------------------------------------+
```

### Mobile Wireframe

```text
+-----------------------------+
| Patent hero                 |
| Filter controls             |
| Patent cards                |
| Quick view modal            |
+-----------------------------+
```

### Problem
Patent records need better interaction, no broken Radix triggers, and no table overflow.

### Solution
Use native buttons as dialog triggers, sorted desktop table, and mobile cards.

### Implementation Method
- Use `PatentQuickViewDialog`.
- Use `button` triggers, not custom components without forwarded refs.
- Keep table in `overflow-auto` container with `min-w`.

### Accessibility Requirements
- Dialog close button has aria-label.
- Trigger labels include patent title.
- Table headers use scope.

### SEO Requirements
- Title: `Patents and Innovation | Instrumentation and Control Engineering`.
- Description describes IP portfolio.

### Expected Outcome
No blank-page risk from invalid triggers, better table UX, stronger IP presentation.

## 11. Laboratory Page

### Desktop Wireframe

```text
+----------------------------------------------------------------------------+
| Labs hero: facilities and instrumentation capability                          |
+----------------------------------------------------------------------------+
| Lab cards grid: name, purpose, equipment, outcomes                            |
+----------------------------------------------------------------------------+
| Virtual lab / safety / booking information                                    |
+----------------------------------------------------------------------------+
```

### Tablet Wireframe

```text
+--------------------------------------------+
| Hero                                       |
| Lab cards 2 columns                        |
+--------------------------------------------+
```

### Mobile Wireframe

```text
+-----------------------------+
| Hero                        |
| Lab card                    |
| Equipment chips             |
+-----------------------------+
```

### Problem
Labs need to feel like real facilities, not placeholders.

### Solution
Create lab cards with real academic utility: equipment, courses served, research use, contact.

### Implementation Method
- Create `labs.json`.
- Render `LabCard`.
- Use real images from `public/labs` or neutral equipment images.

### Accessibility Requirements
- Lab images describe equipment or facility.
- Equipment lists are semantic `ul`.

### SEO Requirements
- Add keywords around instrumentation, control, sensors, automation labs.

### Expected Outcome
Facilities become inspection-ready and useful for prospective students.

## 12. Contact Page

### Desktop Wireframe

```text
+----------------------------------------------------------------------------+
| Contact hero                                                                 |
+----------------------------------------------------------------------------+
| Contact cards: office, email, phone, address                                  |
+----------------------------------------------------------------------------+
| Map / visiting information                                                    |
+----------------------------------------------------------------------------+
| Inquiry form                                                                  |
+----------------------------------------------------------------------------+
```

### Tablet Wireframe

```text
+--------------------------------------------+
| Contact cards 2 columns                    |
| Form                                       |
+--------------------------------------------+
```

### Mobile Wireframe

```text
+-----------------------------+
| Contact card                |
| Email / Phone buttons       |
| Form                        |
+-----------------------------+
```

### Problem
Contact information needs to be complete and action-oriented.

### Solution
Add a dedicated contact route with cards and accessible form.

### Implementation Method
- Add route `/contact`.
- Add `Contact.jsx`.
- Form fields: name, email, role, message.
- Static build uses `mailto:` fallback unless backend is added.

### Accessibility Requirements
- Every input has label.
- Errors are connected using `aria-describedby`.
- Submit button has loading state.

### SEO Requirements
- Add `Organization` structured data with address and contact point.

### Expected Outcome
Visitors can find the department and contact staff easily.

## 13. Component System

### Navbar
- Height desktop: 64px brand bar + 48px nav row.
- Mobile: 56px compact header.
- Sticky top, z-index 40.
- Hover: text color to primary/accent, underline indicator.
- Active group highlighted.
- Keyboard: dropdown opens on focus and closes on blur/Escape.

### Footer
- Three-column desktop: department identity, quick links, contact.
- Tablet: two columns.
- Mobile: single column.
- Include copyright, university name, department name.
- Include sitemap links.

### Hero
- Max width: 1320px.
- Padding: 40px desktop, 28px tablet, 20px mobile.
- One H1.
- CTA row wraps.
- No decorative blobs.

### Faculty Cards
- Desktop: two-column image/content.
- Mobile: stacked.
- Image aspect ratio: 4:5.
- Hover: subtle shadow and 2px translate.
- Accessibility: image alt is faculty name.

### Research Cards
- Mobile-first.
- Category badge, title, authors, year, action.
- Desktop tables replace cards.

### Lab Cards
- Fixed image aspect ratio 16:10.
- Equipment chips wrap.
- CTA: "View lab details".

### Buttons
- Primary: navy background, white text.
- Secondary: white background, navy border.
- Tertiary: transparent text button.
- Min height: 40px.
- Focus ring: 2px primary.
- Disabled: opacity 0.45 and no pointer.

### Forms
- Inputs: 44px height minimum.
- Labels visible.
- Error text 13px.
- Required markers in text, not color only.

### Search Components
- Debounced search input.
- Clear button visible when query exists.
- Result count uses `aria-live="polite"`.

### CTA Components
- Used sparingly.
- Must include one clear action.
- No marketing-style oversized sections.

### Statistics Components
- 2x4 desktop, 2x2 tablet, 1 column mobile.
- Use real data only.
- Labels short and human-readable.

## 14. Accessibility Implementation

Required fixes:
- Add missing alt text to every informative image.
- Decorative images use `alt=""`.
- Ensure one H1 per page.
- Use semantic landmarks.
- Add aria labels for icon-only buttons.
- Use visible focus states.
- Ensure modal focus trap through Radix.
- Ensure mobile nav is keyboard accessible.
- Ensure color contrast meets WCAG AA.
- Avoid hover-only content.
- Tables use `scope="col"` headers.
- Search result counts use `aria-live`.

Expected outcome:
- WCAG 2.1 AA practical compliance.
- Better keyboard and screen-reader experience.

## 15. SEO Implementation

Required files:
- `public/robots.txt`
- `public/sitemap.xml`
- `src/components/SEO.jsx`
- route metadata config

Route metadata:

```js
export const ROUTE_META = {
  "/about": {
    title: "Instrumentation and Control Engineering | COEP Tech",
    description:
      "Explore the Instrumentation and Control Engineering department at COEP Technological University, including faculty, labs, academics, research, and patents.",
  },
  "/faculty": {
    title: "Faculty Directory | Instrumentation and Control Engineering",
    description:
      "Meet the faculty of Instrumentation and Control Engineering at COEP Tech and explore research areas, publications, patents, and achievements.",
  },
};
```

Sample SEO component:

```jsx
export default function SEO({ title, description }) {
  useEffect(() => {
    document.title = title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
  }, [title, description]);

  return null;
}
```

Expected outcome:
- Unique titles.
- Unique descriptions.
- Better crawlability.
- Better search snippets.

## 16. Performance Implementation

Required fixes:
- Keep lazy-loaded routes.
- Split motion vendor chunk.
- Lazy-load below-fold images.
- Use explicit width/height or aspect ratio for images.
- Convert large images to WebP.
- Avoid loading external fonts without `display=swap`.
- Remove unused dependencies after final audit.
- Keep table data computation in `useMemo`.

Expected outcome:
- Reduced layout shift.
- Faster page transitions.
- Improved Lighthouse performance score.

## 17. Security Implementation

Add Netlify headers:

```text
/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  X-Frame-Options: DENY
```

Content Security Policy:

```text
Content-Security-Policy: default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'
```

Expected outcome:
- HTTPS enforcement.
- Reduced XSS and clickjacking risk.
- Cleaner browser security posture.

## 18. Bug Fix Matrix

| Problem | Solution | Implementation Method | Expected Outcome |
|---|---|---|---|
| Blank page after table changes | Use native button triggers for Radix Dialog and clean lint errors | Replace custom Card trigger with button; move render-created components outside render | App loads reliably |
| Yellow VSCode warnings | Fix unused imports and React compiler warnings | Run `npm run lint`; fix root causes | Clean editor state |
| Table overflow | Isolate overflow to table containers | `max-h`, `overflow-auto`, `min-w` | No body horizontal scroll |
| Inconsistent spacing | Use page shell and page stack | Central CSS utilities | Unified layout |
| Over-rounded UI | Reduce radii globally | 8-20px component rules | More mature academic UI |
| Low accessibility labels | Add aria labels and semantic headings | Component-by-component pass | WCAG-aligned UI |
| SEO metadata missing | Add SEO component and route metadata | Update title/meta on route | Better indexing |
| Broken legacy routes | Redirect old route names | React Router redirects | No dead internal links |

## 19. Implementation Roadmap

### Week 1

| Task | Hours | Dependencies | Deliverables |
|---|---:|---|---|
| Stabilize build, lint, runtime blank page | 6 | Existing React app | Clean `npm run lint`, clean `npm run build`, no blank route |
| Create route metadata and SEO component | 5 | Route map | Titles, descriptions, canonical handling |
| Add robots.txt and sitemap.xml | 3 | Final route list | Crawlable static SEO files |
| Refine global layout utilities | 6 | CSS tokens | Page shell, spacing rhythm, overflow prevention |
| Navigation polish | 8 | Navigation config | Accessible desktop/mobile navigation |

### Week 2

| Task | Hours | Dependencies | Deliverables |
|---|---:|---|---|
| Redesign About/Home sections | 10 | Design tokens | Premium hero, metrics, research focus, faculty preview |
| Faculty directory refinement | 8 | Faculty data | Searchable, responsive faculty cards |
| Faculty profile refinement | 8 | Faculty profile routes | Structured sections, profile SEO, accessible controls |
| Image audit and alt text pass | 5 | Public assets | Alt text map and fixed images |
| Footer and contact information | 5 | Department contact data | Production footer and contact route |

### Week 3

| Task | Hours | Dependencies | Deliverables |
|---|---:|---|---|
| Publications table/card refinement | 8 | Publication data | Sortable desktop table, mobile cards, details modal |
| Patents table/card refinement | 6 | Patent data | Sortable table, quick view modal, mobile cards |
| Research projects page | 8 | Research records | Research cards/table and filtering |
| Laboratories page | 8 | Lab data/images | Lab cards, equipment chips, facility detail structure |
| Responsive QA across breakpoints | 6 | Implemented pages | Mobile/tablet/laptop/desktop fixes |

### Week 4

| Task | Hours | Dependencies | Deliverables |
|---|---:|---|---|
| Accessibility QA | 8 | Final UI | Keyboard pass, aria labels, heading audit, contrast audit |
| Performance QA | 6 | Final assets | Image optimization, bundle review, Lighthouse pass |
| Security headers | 4 | Netlify config | HSTS, CSP, XFO, permissions policy |
| Content proofreading | 6 | Department content | Fixed typos, consistent labels, credible copy |
| Final production review | 8 | All work complete | Release checklist and deployment-ready build |

## 20. Scoring Model

| Category | Current Score | Future Score | Improvement |
|---|---:|---:|---:|
| UI | 62 | 91 | 46.8% |
| UX | 58 | 90 | 55.2% |
| Accessibility | 54 | 88 | 63.0% |
| SEO | 42 | 86 | 104.8% |
| Performance | 61 | 84 | 37.7% |
| Security | 48 | 82 | 70.8% |
| Branding | 55 | 92 | 67.3% |
| Content | 60 | 87 | 45.0% |

Scoring basis:
- 0-49: poor / production risk
- 50-69: functional but inconsistent
- 70-84: solid
- 85-94: production-grade
- 95-100: best-in-class with continuous optimization

## 21. Final Acceptance Checklist

Before launch:
- `npm run lint` passes.
- `npm run build` passes.
- No blank page on `/`, `/about`, `/faculty`, `/faculty/:id`, `/publications`, `/patents`, `/laboratories`, `/contact`.
- No body horizontal scroll at 360px, 768px, 1024px, 1440px, 1920px.
- All internal nav links resolve.
- Every image has valid alt behavior.
- Every page has one H1.
- Every page has unique title and description.
- Mobile navigation works by keyboard and touch.
- Dialogs trap focus and close with Escape.
- Tables are usable on desktop and do not break mobile.
- Contact information is visible in footer and contact page.
- `robots.txt` and `sitemap.xml` exist.
- Netlify security headers are deployed.
- Lighthouse targets: Performance 80+, Accessibility 90+, Best Practices 90+, SEO 90+.

## 22. Ownership Handoff

UI/UX designers receive:
- IA, page wireframes, component rules, design tokens.

Frontend developers receive:
- React structures, layout rules, accessibility requirements, table/mobile behavior.

Backend developers receive:
- Contact form integration contract and future API needs.

SEO specialists receive:
- Route metadata, sitemap requirements, structured data plan.

Accessibility specialists receive:
- WCAG checklist, keyboard/modal requirements, heading and alt rules.

Department management receives:
- Content architecture, page responsibilities, and launch acceptance checklist.
