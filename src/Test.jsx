import { use } from 'marked'
import React, { useEffect, useRef } from 'react'
import Markdown from 'react-markdown'

const Test = () => {

    const rootRef = useRef(null)

    useEffect(()=>{
        console.log(rootRef.current);
    },[])

  return (
    <div >
        <Markdown ref={rootRef} className={'mark'}></Markdown>
    </div>
  )
}

export default Test


const content = `When selecting between **IMPS** (Immediate Payment Service) and **NEFT** (National Electronic Funds Transfer) in RazorpayX or any other payment platform, here’s a quick comparison to help you decide:

1. **IMPS (Immediate Payment Service)**:
   - **Speed**: Transfers are almost **instant** and available 24x7, even on holidays.
   - **Cost**: May have slightly higher fees compared to NEFT, depending on your bank or platform.
   - **Limit**: Suitable for lower to mid-range transactions (limits vary by bank but are generally up to ₹2 lakhs).
   - **Best for**: Urgent payments or transfers that need to happen immediately.

2. **NEFT (National Electronic Funds Transfer)**:
   - **Speed**: Transfers are **processed in batches** during bank working hours, meaning there could be a delay if initiated outside business hours.
   - **Cost**: Typically has lower transaction fees compared to IMPS.
   - **Limit**: Suitable for larger transactions. There is no upper transaction limit, though individual banks may impose their own caps.
   - **Best for**: Non-urgent transfers or when you're dealing with larger amounts.

### Which one to choose:
- If you need the payment to go through instantly, **IMPS** is the better option.
- If the payment can wait and you’re looking to transfer a larger amount with possibly lower fees, **NEFT** would be a good choice.

Choose based on the urgency and amount of the payment you need to make!`