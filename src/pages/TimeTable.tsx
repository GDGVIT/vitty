import { useAuthStore } from "../store/authStore";
// import { getTimetable } from "../utils/apicalls";
export default function Timetable() {

    const {username, uuid} = useAuthStore();
    console.log(uuid, "from timetable");
    console.log(username, "from timetable");

    return (
        <div>
            <h1>Timetable</h1>
        </div>
    );
}