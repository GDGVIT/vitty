import { useAuthStore } from "../store/authStore";

export default function ReviewTimeTable() {
    const { timetable, setReview } = useAuthStore();
    const submitText = (e: React.BaseSyntheticEvent): void => {
        e.preventDefault();
        if (timetable === null) {
            alert("Please upload the timetable first!");
            return;
        }
        else {
            setReview(false);
        }
    };

  return (
    <div className="review-wrapper">
      <h1>Review Timetable</h1>
      <div className="review">
        <div className="review-text">
          <ol className="steps">
            <li>Check if the timetable is correct</li>
            <li>Submit to continue! :)</li>
            <button type="submit" onClick={submitText}>Submit Text</button>
          </ol>
        </div>
      </div>
    </div>
  );
}
