import EllipseTR from "../assets/ellipse_tr.png";
import EllipseBL from "../assets/ellipse_bl.png";
import HomeCarousal from "../components/HomeCarousal";
import Auth from "../components/Auth";

export default function Login() {

    return (
        <div className="mt-8 pb-8 flex flex-col items-center justify-around md:flex-row">

            <div className="fixed overflow-hidden opacity-50 ellipse ellipse-tr  right-0">
                <img
                    className="w-72 overflow-hidden md:w-[35vw]"
                    src={EllipseTR}
                    alt="Vitty"
                />
            </div>
            <div className="fixed overflow-hidden opacity-50 ellipse ellipse-bl bottom-0 -left-8">
                <img
                    className="w-72 overflow-hidden md:w-[35vw]"
                    src={EllipseBL}
                    alt="Vitty"
                />
            </div>
            <HomeCarousal />
            <Auth />
        </div>
    );
}
