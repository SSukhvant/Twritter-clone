import React from 'react'

type Props = {
    text: String,
    Icon: any,

}
const SidebarLink = (props: Props) => {
  return (
    <div className='text-[#d9d9d9] flex items-center justify-center xl:justify-start text-xl space-x-3 py-3 hoverAnimation'>
      <props.Icon className="h-7"/>
      <span className='hidden xl:inline'>{props.text}</span>
    </div>
  )
}

export default SidebarLink
