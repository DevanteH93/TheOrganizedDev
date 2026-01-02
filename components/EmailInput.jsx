'use client'

import { useState } from "react";

export default function EmailInput() {
    const [email, setEmail] = useState('')

    async function handleAddSubscriber() {
        // email.includes('@') <--- is used to futher secure the email Sign Up
        email.includes('@')
        try {
            // write the post fetch request to send off the email to whatever service it is that you use to build up your email list
        } catch(err) {
            console.log('Failed to add subscriber: ', err.message)
        }
        
    }
    
    return (
        <div className="sign-up">
            <input value={email} onChange={(e) => {
                setEmail(e.target.value)
            }} placeholder="Email address..." />
            <button onClick={handleAddSubscriber} className="Sign Up">Sign Up</button>
        </div>
    );
}
