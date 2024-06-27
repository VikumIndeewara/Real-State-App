// // import React from 'react'

// // const AboutUs = () => {
// //   return (
// //    <div>About Us</div>
// //   )
// // }

// // export default AboutUs

// // import Swiper core and required modules
// import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
// import back1 from "../assets/images/back.jpg";
// import back2 from "../assets/images/back2.jpg";
// import back3 from "../assets/images/back3.jpg";

// const AboutUs=()=>{
//   return (
//     <Swiper
//       // install Swiper modules
//       className='w-[200px]'
//       modules={[Navigation, Pagination, Scrollbar, A11y]}
//       slidesPerView={2}
//       navigation
//       pagination={{ clickable: true }}
//       scrollbar={{ draggable: true }}
//       onSwiper={(swiper) => console.log(swiper)}
//       onSlideChange={() => console.log('slide change')}
//     >
//       <SwiperSlide ><img src={back1} /></SwiperSlide>
//       <SwiperSlide><img src={back2} /></SwiperSlide>
//       <SwiperSlide><img src={back3} /></SwiperSlide>
//       <SwiperSlide>Slide 4</SwiperSlide>
//       ...
//     </Swiper>
//   );
// };

// export default AboutUs;

import React from 'react'

const AboutUs = () => {
  return (
    <div>AboutUs</div>
  )
}

export default AboutUs
