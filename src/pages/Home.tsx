import SubscriptionList from "@/components/SubscriptionsList";
import './Home.css'

import user from '@/assets/user.png';


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