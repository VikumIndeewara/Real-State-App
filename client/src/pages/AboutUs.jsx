import React from 'react'
import office1 from '../assets/images/office1.jpg'
import office2 from '../assets/images/office2.jpg'
import office3 from '../assets/images/office3.jpg'

const AboutUs = () => {
  return (
    <div  className="mx-auto max-w-5xl py-32 sm:py-46 relative md:px-20 px-2">
      <div className='flex flex-col md:flex-row gap-4 items-center'>
      <div className='text-center mx-20 md:mx-0 md:text-left'>
        <span className='font-bold text-4xl'>We are connecting tenents with suitable houses.</span>
      <p className='mt-5 text-slate-600'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam non sit quos error aliquam velit quo exercitationem quia commodi iure! Eos iure deserunt natus cumque dolore, voluptatum in obcaecati nihil!
      </p>
      </div>
      <div className='relative'>
        <img src={office1} className='w-2/5 rounded-3xl absolute top-25 border-b-4 border-r-4' />
        <img src={office3} className='m-10 rounded-3xl'/>
        <img src={office2} className='absolute rounded-3xl w-2/5 bottom-0 right-0 border-t-4 border-l-4' />
      </div>
      </div>
      <div className='mt-40'>
        <span className='font-bold text-4xl'>Our Mission</span>
        <p className='mt-5'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat nulla adipisci minus quo labore voluptatibus ducimus quia placeat dignissimos repudiandae consectetur dicta error corporis cupiditate, delectus aut vitae magni fugit?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius facilis ducimus ratione reprehenderit recusandae voluptatibus accusantium, obcaecati quisquam nihil aliquam iure veritatis, perspiciatis voluptatum nam at delectus eaque consequatur. Assumenda?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis suscipit optio cupiditate ratione similique ab nihil magni nam obcaecati corporis velit non deserunt omnis, voluptas, unde dolorum dicta quibusdam distinctio?
        </p>
        <div className='flex justify-around mt-20 p-12 border-2 rounded-xl border-slate-100'>
          <div className='flex flex-col text-center border-r-2 border-slate-100'>
            <span className='font-bold text-4xl p-2'>2,200+</span>
            <span className='text-slate-400'>Houses rented </span>
          </div>
          <div className='flex flex-col text-center border-r-2 border-slate-100'>
            <span className='font-bold text-4xl p-2'>100,000+</span>
            <span className='text-slate-400'>New Users </span>
          </div>
          <div className='flex flex-col text-center border-r-2 border-slate-100'>
            <span className='font-bold text-4xl p-2'>1 million+</span>
            <span className='text-slate-400'>Revenue genarated</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
