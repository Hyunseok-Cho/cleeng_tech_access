import SubscriptionList from "@/components/SubscriptionsList";

import './Home.css'

export default function Home() {
    return(
        <main className="Home">
            <h1>My Subscriptions</h1>
            <SubscriptionList />
        </main>
    );
}