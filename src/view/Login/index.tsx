import { AuthCard } from "../../components/common";
import { LoginForm } from "../../components/Login";

export const Login: React.FC = () => {
    return (
        <AuthCard title="Sign In" desc="Access your account below">
            <LoginForm />
        </AuthCard>
    );
};