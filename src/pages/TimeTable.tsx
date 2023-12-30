import { useAuthStore } from "../store/authStore";
export default function Timetable() {

    const {username} = useAuthStore();
    console.log(username, "from timetable");

    return (
        <div>
            <h1>Timetable</h1>
        </div>
    );
}