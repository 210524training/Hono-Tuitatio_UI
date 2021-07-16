import { useState } from "react";
import { useHistory } from "react-router-dom";
import ReimbursementRequest from "../../models/request";

import PendingRequestPage from "../pages/pending/pendingRequestPage";
import MyRequestsPage from "../pages/myrequest/myRequestsPage";
import { currentUser } from "../../remote/grubdash-backend/trms.api";

const LandingPage = () => {

    let history = useHistory();

    const [requests, setRequests] = useState<ReimbursementRequest[]>([]);

    if (currentUser?.role === 'Benco' || currentUser?.role === 'Supervisor' || currentUser?.role === 'Manager') {
        return (

            <div
                style={{
                    width: '80%',
                    position: 'absolute', left: '50%', top: '60%',
                    transform: 'translate(-50%, -50%)'
                }}>
                <PendingRequestPage />
                <br />
                <br />
                <br />
                <br />
                <br />

                <MyRequestsPage />
                <br />

            </div>);
    } else {
        return (

            <div
                style={{
                    width: '80%',
                    position: 'absolute', left: '50%', top: '20%',
                    transform: 'translate(-50%, -50%)'
                }}>
 
                <br />
    
                <MyRequestsPage />
                <br />

            </div>);
    }
}

export default LandingPage;