import Link from "next/link";

export default function TopNavLink({title='Tweet',url='/'}) {
  return (
    <Link href={url}>
      <div style={{display:"flex",cursor:"pointer" ,marginBottom:"20px"}}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width:"20px",height:"20px",marginRight:"10px"}} className="w-6 h-6 mr-3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        {title}
      </div>
    </Link>
  );
}