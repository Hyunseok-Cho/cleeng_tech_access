# Cleeng - Subscriptions React application Technical Assessment

This is a single-page application fetching the Mock-data with its API and rendering on the page. User can manage his/her subscriptions and cancel if he/she wants.

### Technical Stack:
1. Vite + React + TypeScript
2. State: React hooks (useState/useEffect) + Redux Toolkit slice
3. Style: CSS
4. A11y: live regions for loading/error


## Quick Start
```bash
npm install

npm run dev
```
Requirements: Node.js ≥ 18

## Project Structure
```txt
src/
  app/
    store.ts                 # Redux store (configureStore)
  features/
    subscriptions/
      subscriptionsSlice.ts  # Redux slice: items(setAll) + cancelById
  api/
    subscriptions.ts        # Mock API: 1s Delay + fail/empty simulation
  components/
    SubscriptionCard.tsx    # Subscription Item(Information indicating + Cancel)
    SubscriptionsList.tsx   # Subscriptions Listing(fetching/State management/dividing the situation)
    ui/
      ErrorMessage.tsx
      Loading.tsx
  data/
    mock-data.ts            # Mock Data(Three Items)
  lib/
    types.ts                # Subscription/Status Type
    validation.ts           # Validating the data template/Type
  pages/
    Home.tsx                # Main Page
    Home.css
  styles/
    globals.css             # On the last step of building
  tests/
    subscriptionsSlice.test.ts
    validation.test.ts
App.tsx
App.css
index.css
main.tsx
```
Directory Alias: '@' -> 'src/'
* 'vite.config.ts' -> 'resolve.alias'
* 'tsconfig.app.json' -> 'baseUrl' / 'Paths'

## Overview & Mapped Requirements
1. [V]Project Setup - Vite(React + TypeScript)
2. [V]Mock Data & API Simulation - Mock-data.ts, fetchSubscriptions() in 'subscriptions.ts' with 1s delay 
3. [V]State Management - SubscriptionsList manages items/loading/error/empty, Using load(), Using built-in React hook(useState, useEffect)
4. [V]UI - SubscriptionsList fetches the items on first mount(useEffect with load()), Message('Loading...') rendered when it is fetched with 1s delay, Error message displayed when error occurs, mapping over the Subscription items with SubscriptionCard component and rendering when it is fetched, SubscriptionCard receives the data as props and display all 
5. [V]Styling 
6. [V]Bonus(State Management - Redux) - Redux Toolkit slice: setAll/cancelById
7. [V]Bonus(Cancel Button) - Added Cancel Button for each SubscriptionCard, Updating status to cancelled, disabling the cancel button, but only persist in the client-side state 
8. [V]Bonus(Tests - unit) - validation, slice 

* Only persist in the client-side state: No server/storage, restored the original mock-data when it is refreshed.

## Mock API / Simulation
* 'src/api/subscriptions.ts'
  - Delay: 1 second (sleep) then respond
  - Options:
    - fail: boolean  // simulate network error
    - empty: boolean // simulate empty list
    - bad: boolean   // simulate corrupted payload (runtime validation error)
    - delayMs: number (default 1000)
  - Behavior: if `fail = true`, Retry keeps failing until you set `fail = false`.
  - Protect original template: return shallow copy (`map(s => ({ ...s }))`)

## States / Flow
* SubscriptionsList
  * `useEffect(() => load(), [])`: Initially fetching.
  * `load()`: Encapsulating the logic into a single load() function (loading/error/success).
  * `handleCancel(id)`: Updating the only item(which has 'id')'s status to 'cancelled' 
  * Render branches
    1. Loading: Message 'Loading...'
    2. Error: Error Message + Retry button
    3. Successful Fetching: SubscriptionCard Mapping, Rendering
    4. Empty items: Empty state message
  * SubscriptionCard
    * Price/Date: 'Intl.NumberFormat', 'Intl.DateTimeFormat' to formatting
    * Cancel Button: Updating the status to 'cancelled'

## DEV Toggle (Simulate/Verify)
```ts
// SubscriptionsList.tsx
const DEV = { FAIL: false, EMPTY: false, BAD: false, delayMs: 1000 };
```

* Error testing: 'FAIL=true' -> Error UI -> 'FAIL=false' & Retry -> Fetching items
* Empty items: 'EMPTY=true' -> “No subscriptions found.” Message

## A11y
* Notification for Status changing on the Screen Reader.
* Able to Controlling or not: Disabling the button and labeling Cancelled
* Keyboard support
```txt
- Loading: <div role="status" aria-live="polite">
- Error:   <div role="alert"> (+ Retry auto-focus)
```

## Runtime Validation
TypeScript only guarantees types at compile time.
Runtime payloads from the server can be malformed, so we validate before dispatch

Where: After fetchSubscriptions(), before dispatch(setAll())
If validation fails, we throw and render the Error UI

## Tests(Unit)
To guarantee the critical flow is not broken.
  - Unit (done): validation, slice reducers (setAll/cancelById), basic i18n formatting
  - E2E (optional)
  * Run:
    ```bash
    npm run test         # watch
    npm run test:run     # single run
    ```
  * Test files:
    - tests/*.test.ts    

* Result
  ```bash
  DEV  v4.0.7 /Users/hyunseokcho/Github/cleeng_tech_access

  ✓ src/tests/validation.test.ts (2 tests) 7ms
  ✓ src/tests/subscriptionsSlice.test.ts (2 tests) 9ms

  Test Files  2 passed (2)
        Tests  4 passed (4)
    Start at  18:44:06
    Duration  549ms (transform 126ms, setup 0ms, collect 194ms, tests 16ms, environment 0ms, prepare 16ms)
  ```

## i18n
- Price: Intl.NumberFormat with locale by currency (USD → en-US, PLN → pl-PL, …)
- Date: Intl.DateTimeFormat('pl-PL', { timeZone: 'Europe/Warsaw' })