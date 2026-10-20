# Progression — Product Vision, UX, Features, and Build Plan

> **Document purpose:** This is the source-of-truth planning document for rebuilding Progression as a polished, extensible product. It captures the product direction, user experience, feature scope, workflows, architecture, advanced ideas, and validation plan discussed so far.
>
> **Working name:** Progression (not yet legally or commercially cleared)
>
> **Current stack:** Next.js + TypeScript, NestJS + TypeScript, MySQL
>
> **Status:** Product concept and implementation plan. Validate assumptions with users before treating the proposed market, pricing, or differentiators as proven.

---

## 1. Product Summary

**Progression helps people turn meaningful life goals into an organized plan, focused daily actions, visible evidence of progress, and completed outcomes.**

People can create their own life plan and arrange goals into stages—from an initial stage through later stages. Goals can represent any important area of life: career, financial independence, business, learning, communication, health, relocation, or a custom goal.

Each goal can use a specialized workspace with tools relevant to that goal. For example, a Career goal can include company research, applications, resumes, recruiter outreach, interview preparation, and a portfolio. A Learning goal might include a curriculum, practice sessions, projects, and assessments.

All goal types share the same execution foundation:
- Goals and reasons
- Milestones or challenges
- Tasks and recurring actions
- Schedules and available time
- Evidence and outcomes
- Reviews, recovery, and next steps

**Core product principle:** Optimize for meaningful outcomes and sustainable follow-through, not just the number of tasks checked off.

### One-sentence pitch

**Plan the life you want, organize the work behind it, and keep moving toward it—one meaningful step at a time.**

### Possible tagline

**Turn your life goals into real progress.**

### Brand direction

- Working name: **Progression**
- Other names previously considered: Nextmile, LifePath, Milestone, Evolve
- Do not invest in final branding before checking domains, app stores, social handles, and relevant trademark databases.
- Visual direction: calm, premium, clear, and focused; use a restrained neutral interface with one distinctive accent color.
- Avoid making the product look like a noisy gamified checklist or an overwhelming enterprise dashboard.

---

## 2. The Problem to Solve

The product should solve the gap between wanting a better future and making sustained progress toward it.

### Core problems

1. **Too many goals, too little focus:** People start many things and finish few.
2. **Long-term plans do not translate into daily action:** Users know the destination but not the next practical step.
3. **Plans break when life changes:** Work, family, money, or health constraints make the original plan unrealistic.
4. **Activity is mistaken for progress:** Users are busy but cannot tell whether their situation is improving.
5. **Falling behind causes abandonment:** Missed deadlines or broken streaks make people give up.
6. **Information is scattered:** Goals, notes, applications, resumes, learning resources, and plans live in separate tools.
7. **Starting again is difficult:** After a break, people do not know what to resume, change, or discard.

### Product promise

Progression should help users:
- Know what matters now.
- Understand why a task matters.
- Break a large goal into achievable stages.
- Keep relevant information connected to the goal.
- See what they have actually achieved.
- Recover when plans become unrealistic.
- Decide the next step with less confusion.

These are hypotheses to validate through user interviews and a private beta—not claims of proven market demand.

---

## 3. Target Audience and Initial Market

### Broad product vision

Progression can eventually support:
- Career advancement
- Building a business
- Learning and skill development
- Financial independence
- Health and fitness
- Communication and confidence
- Relocation and major life transitions
- Other user-defined goals

### Initial audience hypothesis

Start by interviewing **ambitious professionals who repeatedly plan personal or career improvements but struggle to follow through**.

A career workflow may be the first specialized workspace because it is concrete and the existing implementation already contains useful functionality. However, do not make career the mandatory center of the product. Validate which segment has the strongest pain and willingness to pay.

### Product strategy

1. Build the universal goal and execution engine.
2. Deliver one polished specialized workspace—potentially Career.
3. Allow custom goals using the universal tools.
4. Add another specialized workspace only when user evidence supports it.

Do not market the product as equally optimized for every life domain on day one.

---

## 4. Product Model: Three Layers

### Layer 1 — Life Plan

The user's overall direction:
- Life plan or journey
- User-defined goals
- Goal category and purpose
- Goal ordering and dependencies
- Active, paused, locked, and completed states
- Optional time horizon and priorities

A user may create 3, 5, 10, or another reasonable number of goals. Do not hard-code the original twelve-goal structure as a universal requirement.

### Layer 2 — Goal Workspace

Each goal has a workspace based on its category.

Examples:
- Career workspace
- Business workspace
- Learning workspace
- Financial workspace
- Health workspace
- Custom workspace

A workspace adds domain-specific tools while using the same core goal, milestone, task, and review engine.

### Layer 3 — Execution Engine

Shared capabilities:
- Challenges or milestones
- Tasks and subtasks where needed
- Recurring task occurrences
- Time planning and availability
- Daily focus
- Evidence of completion
- Weekly reviews
- Plan recovery
- Progress calculations
- Activity history and audit events

**Important distinction:** the workspace defines *what tools are relevant*; the execution engine defines *how the user makes progress*.

---

## 5. Core Concepts and Definitions

### Life Plan
A visual overview of the user's larger journey, goals, dependencies, and overall progress.

### Goal
A meaningful outcome or area of improvement. Each goal stores a title, description, why it matters, intended outcome, category, status, optional target date, and ordering/dependencies.

### Goal Workspace
The category-specific area associated with a goal. It contains relevant tools and records.

### Milestone / Challenge
A meaningful stage toward a goal. It includes the expected outcome, size or effort estimate, target date, tasks, notes, evidence criteria, and completion status.

Suggested size labels can remain XS, S, M, L, and XL, but they should be estimates rather than rigid laws. Example defaults: 7, 14, 21, 28, and 30 days. Let users adjust dates with a recorded reason where appropriate.

### Task
A concrete action that contributes to a milestone or goal. It can be one-time or recurring. Tasks should have clear descriptions and optional estimates, due dates, priority, and links to related records.

### Occurrence
A dated instance of a recurring task. Completing today's occurrence does not complete the recurring task itself.

### Evidence
A link, file, note, metric, deliverable, or other proof that an action or milestone was completed.

### Outcome
The real-world result the user wants, such as obtaining a new job, shipping a project, earning revenue, completing a course assessment, or reaching a savings target.

### Review
A reflection on what happened, what changed, what blocked progress, and what should happen next.

### Goal dependency
A relationship explaining why one goal or milestone must precede another. Dependencies should be configurable, not assumed for every user.

---

## 6. Product Principles

1. **Outcome over activity:** task completion is useful but does not automatically prove real-world success.
2. **User-defined life:** users decide their goals, values, and priorities.
3. **Structure without rigidity:** support sequential and flexible planning.
4. **One clear next step:** avoid overwhelming users with every future action.
5. **Recovery over punishment:** missing a deadline should trigger a helpful decision, not shame.
6. **Visible history:** meaningful changes should be understandable and reversible when safe.
7. **Progress is not a streak:** missed days must not erase prior achievements.
8. **Evidence matters:** make completed work and outcomes inspectable.
9. **Useful defaults, user control:** suggest structure but do not silently rewrite a user's plan.
10. **Privacy by default:** personal goals and records are private unless the user explicitly shares them.
11. **Simple core, extensible modules:** avoid building every category before validating demand.
12. **No fake precision:** progress percentages must have documented formulas and communicate what they represent.

---

## 7. User Experience and Main Navigation

Recommended top-level navigation:

1. **Today**
2. **My Journey**
3. **Workspaces**
4. **Insights**
5. **Library**
6. **Settings** (secondary navigation)

The interface should be easy to understand on first use. Avoid exposing every database module as a separate primary navigation item.

### Screen A — Onboarding

Purpose: help users create a useful plan without a long setup process.

Flow:
1. Welcome and short product explanation.
2. Ask what the user wants to improve or achieve.
3. Let them create their first goal.
4. Ask why it matters and what success would look like.
5. Select a category or choose Custom.
6. Choose a planning style: Sequential or Flexible.
7. Suggest a first milestone.
8. Turn the first milestone into a small set of actions.
9. Ask about realistic weekly availability.
10. Land on Today with one clear next action.

Rules:
- Allow users to skip optional questions.
- Do not require users to create ten goals before they can use the product.
- Use progressive disclosure: collect details only when needed.
- Do not promise an unrealistic three-year result.

### Screen B — Today

Purpose: answer “What should I focus on today?”

Show:
- One highlighted priority or current milestone
- Today's tasks across active goals
- Time estimates and planned time blocks
- Overdue items with recovery options
- Quick capture for a new thought or task
- A concise progress summary
- A way to mark tasks complete or record evidence
- Optional routine items, visually secondary to meaningful work

Do not overload the screen with every goal metric, every saved resource, and every historical chart.

### Screen C — My Journey

Purpose: show how the user's goals connect to the bigger picture.

Show:
- Goal cards or a timeline
- Goal status and next milestone
- Goal ordering and dependencies
- Completed, current, paused, and upcoming goals
- A way to add, reorder, pause, or edit goals
- A clear explanation of why a future goal is locked, if applicable

Future goals may be previewed even if their execution is locked.

### Screen D — Goal Overview

Purpose: show everything relevant to one goal.

Show:
- Goal title, why, intended outcome, and category
- Status, target date, and progress definition
- Current milestone
- Upcoming milestones
- Relevant workspace tools
- Tasks and evidence
- Recent history
- Review and next-step actions

The goal overview should connect the specialized workspace to the common execution engine.

### Screen E — Milestone / Challenge Details

Show:
- Intended outcome and completion criteria
- Start date and target date
- Tasks and recurring actions
- Notes, links, and resources
- Estimated effort and available time
- Progress with a clear explanation of the calculation
- Evidence attached to completed work
- Deadline-change and scope-change actions
- Complete, pause, revise, or abandon options with appropriate safeguards

### Screen F — Weekly Review

Ask:
1. What meaningful progress did you make?
2. What did you finish?
3. What is blocked or no longer relevant?
4. Was your planned workload realistic?
5. What did you learn?
6. What should you continue, stop, or change?
7. What are the top priorities for next week?

The user approves proposed plan changes.

### Screen G — Insights

Show useful patterns, not vanity metrics:
- Completed milestones
- Activity versus outcome progress
- Planned versus available time
- Overdue work and recovery
- Goal-level trends
- Progress over selected periods
- Evidence of achievements
- Review history

Avoid shaming language, punitive streaks, and unsupported predictions.

---

## 8. Goal Creation Flow

This flow is central to the product.

### Step 1: Create a goal
User enters a title, for example “Get a better engineering job.”

### Step 2: Explain why it matters
Capture the motivation and the intended outcome. Keep this brief and editable.

### Step 3: Choose a category
Options could include:
- Career
- Business
- Learning
- Finance
- Health
- Communication
- Relocation
- Personal development
- Custom

Categories are extensible. They should not be a hard-coded limit on what a user can pursue.

### Step 4: Choose planning style
- **Sequential:** a later stage is activated after prerequisites are met.
- **Flexible:** multiple goals can be active simultaneously.
- A mixed model can be supported through explicit dependencies.

### Step 5: Define success
Ask for an observable result where possible. Examples:
- “Receive and accept an offer meeting my criteria.”
- “Publish an MVP and obtain the first paying customer.”
- “Pass the assessment and demonstrate the skill in a project.”

### Step 6: Set constraints
Capture available time, target horizon, budget or other relevant constraints only where useful.

### Step 7: Create the first milestone
The product may suggest a breakdown, but the user reviews and approves it.

### Step 8: Generate initial actions
Create a small, realistic number of tasks. Avoid generating dozens of actions that the user has not reviewed.

### Step 9: Start the goal
Show the goal in My Journey and place the next action on Today.

### Example: Career goal

Goal: Get a better engineering job.

First milestone: Prepare a credible job-search foundation.

Possible actions:
- Review the master resume.
- Identify target role titles.
- Define employer-selection criteria.
- Prepare a portfolio proof point.
- Identify the first set of suitable employers.

Career workspace tools then connect to this goal:
- Company research
- Applications
- Resume versions
- Contacts and interactions
- Interview preparation
- Skills and portfolio evidence

---

## 9. Specialized Workspaces

### A. Career Workspace

This is a strong candidate for the first specialized workspace because the current product already has a substantial base.

#### Companies
A researched employer record can include:
- Company name and website
- Product and industry
- Locations and remote policy
- Eligibility for the user's location
- Technical fit and seniority
- Research status
- Score and reason for the score
- Sources, last-verified date, and next-check date
- Notes and next action

Research status should remain separate from application status.

#### Target Roles
- Role title
- Location and remote preference
- Seniority
- Required skills
- Search strategy and keywords

#### Applications
- Company and role, or a standalone role
- Job description and link
- Date applied
- Application stage
- Resume version used
- Contacts and interactions
- Interview dates and notes
- Next action and follow-up date
- Outcome and reason, if known

#### People and Outreach
- Recruiters, hiring managers, founders, employees, referrals, and other relevant contacts
- Company, role, relationship, priority, and preferred channel
- Dated interactions
- Follow-up reminders
- Outreach status
- LinkedIn activity, kept separate from direct messages

Avoid encouraging indiscriminate outreach. The product should support researched, relevant contact and a reasonable follow-up policy.

#### Resume Builder
- Master resume as the factual source of truth
- Separate tailored resume per role
- Job description and requirements
- Claimed and unclaimed requirements
- Resume version history
- Preview and export
- Link the version actually sent to an application

Never invent skills, employment history, credentials, or achievements to match a job description.

#### Interview Preparation
- Question bank and categories
- User's answer and supporting notes
- Practice status
- Company and role associations
- Resume/project associations
- Spoken practice sessions and self-assessment
- Evidence of improvement over time

#### Search Keywords and Job Sources
- Saved job-search phrases
- Job platforms and search links
- Last checked and next check
- Search notes and results

#### Career Workspace outcome examples
- A suitable offer accepted
- A portfolio project completed
- Interview readiness demonstrated
- A professional network developed

Do not treat application volume alone as career success.

### B. Business Workspace — Future Candidate

Possible modules:
- Ideas and assumptions
- Customer interviews
- Problem validation
- Competitor research
- Experiments
- MVP backlog
- Leads and customer pipeline
- Launch plan
- Revenue and outcome tracking

### C. Learning Workspace — Future Candidate

Possible modules:
- Curriculum and topics
- Learning resources
- Practice sessions
- Assessments
- Projects and deliverables
- Skill evidence
- Review and revision schedule

### D. Financial Workspace — Future Candidate

Possible modules:
- Savings targets
- Budget and expense tracking
- Income targets
- Debt repayment
- Emergency reserve
- Assets and financial milestones

Start with user-entered data and clear privacy controls. Avoid claiming to provide regulated financial advice.

### E. Health and Fitness Workspace — Future Candidate

Possible modules:
- User-defined fitness outcomes
- Training plan and routines
- Activity records
- Recovery and review
- Evidence of progress

Keep this distinct from medical diagnosis or treatment functionality.

### F. Custom Workspace

Users should still be able to create a goal without a specialized category. The common execution engine must work on its own.

---

## 10. Daily Planning and Routines

### Today
Aggregates relevant tasks from active goals into a clear daily plan.

### Goal Time
A planned start/end time or time block for a goal on a given day. Scheduling work does not automatically complete it.

### Daily Routine
Repeated actions such as morning preparation, exercise, reflection, or practice. A routine can link to a goal, but completing the routine should not automatically complete the goal.

### Weekly Task
A task intended to be completed once within a defined week. Specify the user's week boundary and time zone.

### Consistency
A secondary signal that the user has shown up. It should not override milestones or outcomes.

### Capacity-aware planning
Estimate realistic available time. Do not schedule more work than the user says they can do. Allow time estimates to be revised based on experience.

---

## 11. Progress Model

Do not use one percentage to imply that all forms of progress are equivalent.

### Activity progress
Measures completed actions:
- Tasks
- Practice sessions
- Applications sent
- Customer conversations

### Milestone progress
Measures completed stages:
- Project shipped
- Assessment passed
- Interview stage completed
- Prototype validated

### Outcome progress
Measures the real-world result:
- Job offer accepted
- Revenue achieved
- Savings target reached
- Demonstrated competence

### Recommended display

Show these separately when relevant. Use clear labels and avoid implying that task completion guarantees the outcome.

### Calculation rules to specify

Before implementation, decide:
- Whether milestones have equal or weighted contributions
- Whether users can define weights
- How skipped and cancelled tasks affect calculations
- How recurring tasks are counted
- How goal dependencies affect the overall plan
- Whether a goal can be completed without every optional task
- How to handle deleted or revised milestones
- How historical progress is preserved

Do not allow users to manually change a calculated percentage unless there is a separate, explicitly defined manual outcome metric.

---

## 12. Advanced Features and Differentiators

Build these after the core experience is validated.

### Priority 1 — Adaptive Planning
When work falls behind:
- Identify the overloaded or blocked items.
- Show the consequences of changing the plan.
- Suggest extending the deadline, reducing scope, or replacing a milestone.
- Let the user approve changes.
- Preserve the original plan and change history.

### Priority 1 — Weekly Review and Recovery
After a difficult week or a long absence:
- Summarize the last meaningful achievement.
- Identify overdue or irrelevant tasks.
- Ask what has changed.
- Suggest the smallest useful restart.
- Let the user update their plan without losing historical progress.

### Priority 2 — Evidence of Achievement
Allow users to attach:
- Links
- Files
- Notes
- Metrics
- Project deliverables
- Screenshots where appropriate

Evidence should be linked to the task, milestone, or outcome it supports.

### Priority 2 — Capacity-aware Scheduling
Use available time, task estimates, and priorities to suggest a realistic schedule. Treat estimates as uncertain and allow users to override them.

### Priority 2 — AI Planning Assistant
Potential capabilities:
- Break down a goal into milestones
- Suggest tasks and dependencies
- Estimate effort ranges
- Identify missing steps
- Summarize a weekly review
- Explain why a plan may be unrealistic
- Retrieve relevant notes and past evidence
- Suggest a recovery plan

Requirements:
- Use actual user context with permission.
- Clearly distinguish suggestions from facts.
- Require confirmation before consequential changes.
- Avoid fabricated evidence, deadlines, or claims.
- Protect personal data and provide appropriate controls.
- Evaluate outputs for usefulness, accuracy, safety, and cost.

### Priority 3 — Goal Dependency Engine
Allow users to define relationships such as:
- Goal B requires Goal A
- Goal C can happen in parallel
- A milestone is optional
- A task blocks another task

Explain why an item is locked and what unlocks it.

### Priority 3 — Plan Simulation
Let users explore “what if” scenarios:
- What if I can spend only four hours a week?
- What if I delay this milestone?
- What if I pause a goal for a month?

Present estimates as scenarios, not guarantees.

### Priority 3 — Goal Templates
Offer optional starting plans for common outcomes. Templates should be editable and should never force users into the same life plan.

### Potential future extensions
- Calendar integration
- Reminder delivery
- Import and export
- Public portfolio or achievement report
- Coach or accountability partner sharing
- Team or coaching workflows
- External service integrations

Do not build all of these before core retention and user demand are demonstrated.

---

## 13. Recommended MVP Scope

The first usable product should be smaller than the full vision.

### Must have
- Secure user accounts
- Onboarding
- User-defined life plan and goals
- Sequential and flexible planning basics
- Goal categories and custom goals
- Milestones/challenges
- One-time and recurring tasks
- Today dashboard
- Goal overview
- Progress calculations with documented rules
- Weekly review
- Basic evidence and notes
- Goal pause, resume, and recovery
- Data export or a reasonable way for users to retrieve their data
- Automated tests for core business rules

### First specialized workspace
Career, if discovery validates it:
- Companies
- Target roles
- Applications
- People and interactions
- Resume versions
- Interview bank
- Search links and keywords

Reuse existing modules where they are reliable and aligned with the new model.

### Defer
- Multi-agent AI
- Complex automated job discovery
- Social feeds and public leaderboards
- Many specialized workspaces
- Financial account integrations
- Complex gamification
- Microservices
- Sophisticated forecasting
- Team collaboration
- Unnecessary notifications

---

## 14. Technical Architecture

### Recommended stack

- **Frontend:** Next.js + TypeScript
- **Backend:** NestJS + TypeScript
- **Database:** MySQL
- **API:** REST initially, with documented request/response contracts
- **Testing:** Unit, integration, and end-to-end tests
- **Background jobs:** Add a queue when reminders, scheduled work, or AI jobs require it
- **Observability:** Structured logging, error tracking, backups, and health checks
- **Deployment:** Separate development, staging, and production environments

Keep the stack unless a measured need justifies a change.

### Recommended architecture: modular monolith

Keep one backend deployment initially, with domain boundaries such as:

- Identity and access
- Life plans and goals
- Milestones and dependencies
- Tasks and occurrences
- Scheduling and routines
- Reviews and evidence
- Workspace framework
- Career workspace
- Notifications
- AI assistance (later)
- Billing (when validated)

Avoid introducing microservices before the product requires them.

### Domain boundaries

The universal execution engine should not depend on Career-specific models. Career applications should link to a goal or milestone through clear relationships, while the task and review functionality remains reusable.

### Important engineering rules
1. Enforce user ownership and authorization on the server.
2. Use migrations, foreign keys, transactions, and appropriate indexes.
3. Define a consistent time-zone strategy.
4. Make recurring occurrence generation deterministic and idempotent.
5. Preserve meaningful history and change events.
6. Validate all inputs on the backend.
7. Test goal and milestone transitions.
8. Protect resumes, personal notes, and other private information.
9. Plan backup and restore procedures.
10. Avoid calculating critical business rules only in the frontend.

---

## 15. Initial Data Model

This is a starting model, not a final schema. Confirm relationships and cardinality before writing migrations.

### Shared core
- `users`
- `life_plans`
- `goals`
- `goal_dependencies`
- `goal_workspaces` or a suitable workspace configuration
- `milestones`
- `tasks`
- `task_occurrences`
- `time_blocks`
- `routines`
- `routine_occurrences` (if routine tracking requires its own lifecycle)
- `reviews`
- `evidence`
- `activity_events`
- `attachments` (if file support is introduced)
- `notifications` (when required)

### Career workspace
- `companies`
- `target_roles`
- `applications`
- `resume_versions`
- `resume_tailorings`
- `contacts`
- `interactions`
- `interview_sections`
- `interview_questions`
- `job_sources`
- `search_keywords`
- `skills`
- `portfolio_items`

### Important modeling choices
- Decide whether a user can have multiple life plans.
- Do not hard-code exactly twelve goals.
- Use explicit states and transitions.
- Keep company research status separate from application pipeline status.
- Keep master resume facts separate from tailored versions.
- Keep a recurring task separate from its dated occurrences.
- Define how deleting a record affects linked history.
- Use ownership rules for every user-owned record.
- Prefer normalized relational data for core entities; introduce JSON configuration only where it genuinely helps extensibility.

---

## 16. Product Flow Examples

### Flow A — New user reaches a first achievement

1. User signs up.
2. User creates a goal and explains why it matters.
3. User chooses a category and planning style.
4. User defines what success looks like.
5. User creates the first milestone.
6. Progression suggests a small set of tasks.
7. User reviews and starts the milestone.
8. Today shows the next useful action.
9. User completes an action and attaches evidence if useful.
10. Progression updates activity progress.
11. User completes the milestone after meeting its criteria.
12. Weekly review captures lessons and the next step.

### Flow B — Career job search

1. User creates a Career goal.
2. User defines target roles and constraints.
3. User researches suitable employers.
4. User records sources and verification dates.
5. User adds a target role and application.
6. User selects the resume version sent.
7. User records relevant contacts and interactions.
8. User prepares and practices interview questions.
9. User records outcomes and next actions.
10. The career milestone is updated based on its defined completion criteria.
11. The broader outcome is tracked separately from activity volume.

### Flow C — User misses a deadline

1. A milestone becomes overdue.
2. Progression explains the current state without shaming the user.
3. User reviews what remains and what changed.
4. The system offers options: extend the date, reduce scope, pause, replace, or abandon.
5. User confirms the decision.
6. The original deadline and change event remain in history.
7. Today reflects the revised plan.

### Flow D — User returns after a break

1. Show the last meaningful achievement.
2. Summarize outstanding milestones and tasks.
3. Ask whether priorities or available time have changed.
4. Identify outdated work.
5. Suggest a small restart action.
6. User approves the revised plan.
7. Resume normal planning.

### Flow E — User creates a custom goal

1. User chooses Custom.
2. User describes the intended outcome.
3. Progression provides common milestone and task tools.
4. User creates milestones and evidence criteria manually or from an optional suggestion.
5. The goal appears in My Journey and Today.
6. No category-specific module is required.

---

## 17. Product Validation and Metrics

### Discovery interviews

Talk to potential users who have attempted meaningful goals and struggled to follow through.

Ask:
- Tell me about the last important goal you abandoned or delayed.
- What made it difficult to continue?
- How did you plan and track it?
- Which tools did you use?
- What happened when your schedule changed?
- What did you do when you returned after a break?
- What was the real cost of not making progress?
- Have you paid for a solution? What did you pay for?
- What would need to improve for you to use a new product every week?

Ask about past behavior rather than only asking whether someone likes the idea.

### Suggested metrics
- Activation: users who create a goal, define a milestone, and complete a first meaningful action
- Retention: users who return and make progress in subsequent weeks
- Milestone completion rate
- Recovery rate after inactivity or overdue work
- Outcome attainment, with evidence where practical
- Time to first meaningful achievement
- User-reported usefulness of weekly reviews
- Conversion to paid plans, if tested

Set numeric targets after establishing a baseline. Do not invent success thresholds before observing real users.

---

## 18. Monetization Hypothesis

Consider a freemium model, then validate whether users will pay.

### Free
- Core life plan
- Basic goals, milestones, and tasks
- Today dashboard
- Basic progress and review
- Data export

### Pro
Potentially:
- More advanced planning and insights
- Multiple life plans
- Expanded specialized workspaces
- Evidence and portfolio reports
- Advanced templates and customization

### AI-enabled tier or usage allowance
Potentially:
- Goal decomposition
- Adaptive plan suggestions
- Review summaries
- Contextual retrieval from the user's own notes
- Assisted planning

Keep user data accessible. Avoid paywalling essential access to previously created personal records.

Do not finalize prices until interviews, usage, costs, and willingness-to-pay tests provide evidence.

---

## 19. Implementation Roadmap

### Phase 1 — Product discovery and scope
- Validate the target audience and problem.
- Map the user journeys.
- Decide the MVP and non-goals.
- Document business rules and acceptance criteria.

**Exit condition:** clear product promise, audience hypothesis, scope, and validation plan.

### Phase 2 — UX and prototype
- Design onboarding, Today, Journey, Goal, Milestone, and Review.
- Design responsive and accessible layouts.
- Test a clickable prototype with prospective users.

**Exit condition:** users understand the workflow without extensive explanation.

### Phase 3 — Domain model and backend
- Create migrations and entity relationships.
- Implement authorization and core services.
- Implement goal, milestone, task, recurrence, and progress rules.
- Add automated tests.

**Exit condition:** core business rules are reliable without relying on UI behavior.

### Phase 4 — Core frontend
- Build the five core screens.
- Connect the API.
- Add loading, empty, error, and success states.
- Complete the new-user journey end to end.

**Exit condition:** a user can create a goal, work on it, review it, and complete a milestone.

### Phase 5 — First specialized workspace
- Choose the workspace supported by discovery.
- Reuse existing features where appropriate.
- Link workspace records to goals and milestones.
- Migrate relevant existing data if needed.

**Exit condition:** the specialized workflow adds clear value to the universal product.

### Phase 6 — Private beta
- Recruit a small target-user group.
- Observe actual use.
- Fix reliability and usability problems.
- Review retention and qualitative feedback.

**Exit condition:** evidence of repeated use and meaningful user value.

### Phase 7 — Monetization and expansion
- Test willingness to pay.
- Add only justified premium features.
- Improve onboarding and support.
- Expand into other workspaces based on demand.

**Exit condition:** evidence of a viable business model and a repeatable way to reach users.

These timings depend on available time, code reuse, and scope. Do not use a fixed launch date as a substitute for passing the exit conditions.

---

## 20. Decisions to Make Before Coding

Resolve these questions in the product specification:

1. Is a user allowed multiple life plans, or just one?
2. Are goals unlimited, or should there be a soft recommendation for active goals?
3. Can a goal contain multiple milestones at the same time?
4. Can users choose sequential, flexible, or mixed dependencies?
5. What precisely makes a milestone complete?
6. Which progress calculations are automatic, and which are user-defined outcome metrics?
7. What happens to tasks and occurrences when a goal is paused or deleted?
8. Can deadlines change? How are changes recorded?
9. What is the minimum viable Career workspace?
10. What user data must be importable from the current product?
11. What information is private, exportable, or shareable?
12. Which features are explicitly out of scope for the first release?

Do not attempt to answer all future product questions in code. Document the decision, its reason, and any consequences.

---

## 21. Recommended First Steps

1. Create `01-product-vision.md` from the first sections of this document.
2. Create `02-user-research.md` and interview potential users.
3. Create `03-mvp-scope.md` with explicit must-haves and deferred features.
4. Create `04-domain-model.md` with entity relationships and state transitions.
5. Create `05-ux-and-architecture.md` with screen specifications and technical boundaries.
6. Review the current codebase and inventory which existing features can be reused.
7. Design and test the core user flow before building all specialized workspaces.

### Final direction

**Build Progression as a universal goal execution engine with optional specialized workspaces.**

The life plan gives users direction. Workspaces provide the right tools for different goals. The execution engine connects those tools to milestones, daily action, evidence, reviews, and real outcomes.

The long-term advantage should come from making it easier to keep a coherent plan, recover when life changes, and demonstrate meaningful progress—not from having the longest feature list.
