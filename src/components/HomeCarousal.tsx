import { Carousel } from "react-responsive-carousel";
import carousel1 from "../assets/carousel1.png";
import carousel2 from "../assets/carousel2.png";
import carousel3 from "../assets/carousel3.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function HomeCarousal() {
  return (
    <div>
      <Carousel
        autoPlay
        width="25rem"
        infiniteLoop
        showIndicators={true}
        showStatus={false}
        showArrows={false}
        showThumbs={false}
        interval={5000}
        stopOnHover={false}
        axis="horizontal"
        centerMode={true}
        centerSlidePercentage={100}
      >
        <div className="flex flex-col items-center">
          <div className="h-[15rem] md:h-[17.5rem] m-4 md:m-2">
            <img
              src={carousel1}
              alt="Carousel"
              className="max-h-[17.5rem] max-w-[13.5rem] md:max-h-[20rem] md:max-w-[15rem]"
            />
          </div>
          <h3 className="my-4 text-xl md:text-[1.375rem]">Never miss a class</h3>
          <p className="text-center text-blue-500 text-sm w-[17.5rem] mb-12">
            Notifications to remind you about your upcoming classes
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-[15rem] md:h-[17.5rem] m-4 md:m-2">
            <img
              src={carousel2}
              alt="Carousel"
              className="max-h-[17.5rem] max-w-[13.5rem] md:max-h-[20rem] md:max-w-[15rem]"
            />
          </div>
          <h3 className="my-4 text-xl md:text-[1.375rem]">Get a sneak peek</h3>
          <p className="text-center text-blue-500 text-sm w-[17.5rem]">
            View your upcoming classes and timetable via the widget
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-[15rem] md:h-[17.5rem] m-4 md:m-2">
            <img
              src={carousel3}
              alt="Carousel"
              className="max-h-[17.5rem] max-w-[13.5rem] md:max-h-[20rem] md:max-w-[15rem]"
            />
          </div>
          <h3 className="my-4 text-xl md:text-[1.375rem]">
            Upload once, view anywhere
          </h3>
          <p className="text-center text-blue-500 text-sm w-[17.5rem]">
            Instant sync across all your devices via the app and extension
          </p>
        </div>
      </Carousel>
    </div>
  );
}
