'use client'

export default function Error({error, reset}){
  return (
    <div>
      <h4>{error}</h4>
      <button onClick={()=>{ reset() }}>다시시도</button>
    </div>
  )
}