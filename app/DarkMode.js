'use client'
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DarkMode(){
    let router = useRouter()
    useEffect(()=>{
      let cookie = ('; '+document.cookie).split(`; mode=`).pop().split(';')[0]
      if (cookie == '') {
        document.cookie = 'mode=light; max-age=' + (3600 * 24 * 400)
      }
    },[])
    return (
        <span onClick={()=>{ 
            let cookies = ('; '+document.cookie).split(`; mode=`).pop().split(';')[0];
            if (cookies == 'light') {
              document.cookie = 'mode=dark; max-age=' + (3600 * 24 * 400)
              router.refresh()
            } else {
              document.cookie = 'mode=light; max-age=' + (3600 * 24 * 400)
              router.refresh()
            }
           }}>{document.cookie == 'mode=light' ? '🌙' : '☀️'}</span>
    )
  } 