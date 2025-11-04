import SubscriptionList from "@/components/SubscriptionsList";
import './Home.css'

import user from '@/assets/user.png';

/**
 * Home (root) page shell.
 * Renders a simple header with user block and the subscription listing below.
 * @remarks
 * - The user block is static/demonstrational (no auth/profile integration).
 * - styles for text and user informations on the top are applied via `Home.css`.
 */
export default function Home() {
    return(
        <main className="Home">
            <div className="Top">
                <h1>My Subscriptions</h1>
                <div className="UserInfo">
                    <img src={user} alt="User_Profile"
                    className="user_profile" />
                    <div className="UserName">
                        <p>Hello!</p>
                        <p className="FullName">HYUNSEOK CHO</p>
                    </div>
                </div>
            </div>
            <SubscriptionList />
        </main>
    );
}