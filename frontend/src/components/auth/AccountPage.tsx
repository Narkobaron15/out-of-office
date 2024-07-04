import './account_page.css'
import {Badge, Card, Spinner} from "flowbite-react";
import {useEffect, useState} from "react";
import {AccountModel} from "../../models/account_model.ts";
import {Link, useNavigate} from "react-router-dom";
import http_common from "../../common/http_common.ts";

const placeholderImage = "https://img.icons8.com/?size=128&id=tZuAOUGm9AuS&format=png"

export default function AccountPage() {
    const [account, setAccount] = useState<AccountModel | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('auth')) {
            navigate('/login')
            return
        }

        http_common.get('auth/check')
            .then(({data}) => setAccount(data))
            .catch(() => navigate('/login'))
    }, [])
    return account ? (
        <div className="account-container">
            <Card className="card">
                <h2>Account Overview</h2>

                <div className="flex justify-center mb-4">
                    <img
                        src={account.pictureUrl ?? placeholderImage}
                        alt={`${account.fullName}'s profile`}
                        className="w-24 h-24 rounded-full mr-4"
                    />
                    <div>
                        <h3 className="text-xl font-semibold">{account.fullName}</h3>
                        <p>{account.position}</p>
                        <p>{account.subdivision}</p>
                    </div>
                </div>

                <section>
                    <h4>Contact Information</h4>
                    <p>
                        Email:&nbsp;
                        <Link to={`mailto:${account.email}`} className="text-blue-600">
                            {account.email}
                        </Link>
                    </p>
                </section>

                <section>
                    <h4>Account Details</h4>
                    <p>ID: {account.id}</p>
                    <div className="flex justify-center">
                        Status:
                        <Badge className="ml-3 mt-1" color={account.status ? "green" : "red"}>
                            {account.status ? "Active" : "Inactive"}
                        </Badge>
                    </div>
                    <p>Days Off Remaining: {account.daysOff}</p>
                </section>

                <section>
                    <h4>Account Activity</h4>
                    <p>Created At: {new Date(account.createdAt).toLocaleDateString()}</p>
                    <p>
                        Updated At:&nbsp;
                        {
                            account.updatedAt
                            ? new Date(account.updatedAt).toLocaleDateString()
                            : "Never"
                        }
                    </p>
                </section>
            </Card>
        </div>
    ) : (
        <div className="flex min-h-svh flex-col justify-center align-middle">
            <Spinner color="primary" size="lg"/>
        </div>
    )
}
