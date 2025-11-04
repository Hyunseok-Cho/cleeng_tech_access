# Cleeng - Subscriptions React application Technical Accessment

This is a single-page-application fetching the Mock-data with its API and rendering on the page. User can manage his/her subscriptions and cancel if he/she wants.

### Technical Stack:
1. Vite + React + TypeScript
2. Built-in React hook: useState, useEffect
3. Style: CSS
4. Optimization: useRedux(current plan)

## Quick Start
```bash
npm install

npm run dev
```
Required: Higher than Node v18 recommended.

## Project Structure
```txt
src/
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
  pages/
    Home.tsx                # Main Page
  styles/
    globals.css             # On the last step of building
App.tsx
main.tsx

```
Directory Alias: '@' -> 'src/'
* 'vite.config.ts' -> 'resolve.alias'
* 'tsconfig.app.json' -> 'baseUrl' / 'Paths'

## Overview & Mapped Requirements
1. Project Setup - Vite(React + TypeScript) | v Done
2. Mock Data & API Simulation - Mock-data.ts, fetchSubscriptions() in 'subscriptions.ts' with 1s delay | v Done
3. State Management - SubscriptionsList manages items/loading/error/empty, Using load(), Using built-in React hook(useState, useEffect) | v Done
4. UI - SubscriptionsList fetches the items on first mount(useEffect with load()), Message('Loading...') rendered when it is fetched with 1s delay, Error message displayed when error occurs, mapping over the Subscription items with SubscriptionCard component and rendering when it is fetched, SubscriptionCard receives the data as props and display all | v Done
5. Styling | x Not-yet
6. Bonus(State Management - Redux) | x Not-yet
7. Bonus(Cancel Button) - Added Cancel Button for each SubscriptionCard, Updating status to cancelled, disabling the cancel button, but only persist in the client-side state | v Done
8. Bonus(Tests - unit or end-2-end) | x Not-yet

* Only persist in the client-side state: No server/storage, restored the original mock-data when it is refreshed.

## Mock API / Simulation
* 'src/api/subscriptions.ts
  * Delay: 1 second delay(sleep) and respond
  * Option:
    * fail: boolean -> Simulation for Network Fail
    * empty: boolean -> Simulation for Empty items in Subscriptions
  * Protect the original template: Returning shallow Copy('map(({...s}))')

  Behavior: The error keeps occuring during 'fail' is 'true' even though user clicks the button 'Retry'. However, It will fetch the data without problems after clicked 'Retry' button if user changes 'fail' to 'false'.

## States / Flow
* SubscriptionsList
  * useEffect(() => load(), []): Initially fetching.
  * load(): Capculating the single function for Loading/Error/Successfully Fetching.
  * handleCancel(id): Updating the only item(which has 'id')'s status to 'cancelled' 
  * Rendering divide spots
    1. Loading: Message 'Loading...'
    2. Error: Error Message + Retry button
    3. Successful Fetching: SubscriptionCard Mapping, Rendering
    4. Empty items: Informing Message
  * SubscriptionCard
    * Price/Date: 'Intl.NumberFormat', 'Intl.DateTimeFormat' to formatting
    * Cancel Button: Updating the status to 'cancelled'

## DEV Toggle (Simulate/Verificate)
'SubscriptionList.tsx'
```ts
const DEV = {
  FAIL: false,  
  EMPTY: false,
};
```
* Error testing: 'FAIL=true' -> Error UI -> 'FAIL=false' & Retry -> Fetching items
* Empty items: 'EMPTY=true' -> “No subscriptions found.” Message

## A11y
* (Plan)
* Notification for Status changing: aria-live="polite" to notice the changing
* Able to Controlling or not: Disabling the button and labling Cancelled
* Keyboard Controlling

## Runtime Validation
TypeScript only guarantees in the Complie Time.
Wrong data can be enterred from server/outer in practical runtime, it is not validated with only types.

Where?
After 'fetchSubscriptions()', Checking all items are satisfied with template of Subscription before 'setItem()'

How?
If it is failed, throw the error UI.

## Tests (Plan)
To guarantee the critical flow is not broken.
* Unit
  * Formatter: Price/Date output is done well
  * State Update: Checking maintain immutability and change to 'cancelled' on the correct id items when 'handleCancel(id)' is called.
  * Loading: If the cards are rendered well after the message 'Loading...'
* E2E
  * Enter the application -> 'Loading...' -> Cards appear
  * First card Cancel -> Cancelled + disabled button
  * 'FAIL=true' -> Error UI -> 'FAIL=false' -> Retry -> Fetch

Test file will be located in: 'src/__tests__/*'