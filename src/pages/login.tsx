import HomeCarousal from "../components/HomeCarousal";
import Auth from "../components/Auth";

export default function Login() {
  return (
    <div className="mt-8 pb-8 flex flex-col items-center justify-around md:flex-row">
      <HomeCarousal />
      <Auth />
    </div>
  );
}
