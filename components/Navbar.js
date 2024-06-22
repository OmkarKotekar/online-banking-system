import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
    const [token, setToken] = useState('');

    useEffect(() => {
        // Check if window is defined to ensure we are in the browser environment
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                setToken(storedToken);
            }
        }
    }, []);

    const handleLogout = () => {
        // Remove token from localStorage and reset state
        localStorage.removeItem('token');
        setToken('');
    };

    // Function to update token state when login is successful
    const updateToken = (newToken) => {
        setToken(newToken);
    };

    return (
        <>
            <div className='bg-[#0033a0] text-white h-30 flex justify-between items-center font-semibold'>
                <Link href='/'>
                    <div className='flex items-center'>
                        <Image className='rounded-full m-4' src='/bank_logo.png' width={50} height={50} alt='Thakur Bank' />
                        <div className='text-xl'>
                            Thakur Bank
                        </div>
                    </div>
                </Link>
                <ul className="flex justify-between m-4">
                    <li className='p-2'><Link href="/">Home</Link></li>
                    <li className='p-2'><Link href="/history">Transaction History</Link></li>
                    <li className='p-2'><Link href="/transfer">Transfer</Link></li>
                </ul>
                {token ? (
                    <div className='flex items-center'>
                        <button className='p-2 bg-red-700 mb-3 mt-5 rounded-xl ml-2' onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className='flex gap-5 pr-10'>
                        <button className='p-2 bg-purple-700 mb-3 mt-5 rounded-xl'>
                            <Link href="/login">Login</Link>
                        </button>
                        <button className='p-2 bg-purple-700 mb-3 mt-5 rounded-xl'>
                            <Link href="/register">Register</Link>
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Navbar;
