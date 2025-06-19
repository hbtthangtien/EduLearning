import {
    useEffect,
    useState
} from "react";
import {
    getUserIdFromToken
} from "../utils/authHelper";

export const useUserId = () => {
    const [id, setId] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = getUserIdFromToken();
        if (userId) {
            setId(userId);
            setLoading(false);
        } else {
            setError("Không tìm thấy hoặc không decode được token.");
            setLoading(false);
        }
    }, []);

    return {
        id,
        loading,
        error
    };
};