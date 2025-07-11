"use client"

import {useAccount, useConnect, useSignMessage} from 'wagmi'
import {CheckCircle, Copy, LoaderPinwheel, Shield, Terminal, Zap} from 'lucide-react';
import {useEffect, useState} from "react";
import {injected} from 'wagmi/connectors'
import {hashMessage} from 'viem/utils'


export default function Page() {

    const {isConnected, isConnecting, address} = useAccount();
    const {connect} = useConnect();
    const {
        signMessage,
        data: signature,
        isPending: signingPending,
        isSuccess: signingSuccess,
        error: signingError
    } = useSignMessage()

    useEffect(() => {

        if (signingSuccess) {
            setHashMessageVar(hashMessage(message))
        }

    }, [signingSuccess])

    const [message, setMessage] = useState<string>('');
    const [hashMessageVar, setHashMessageVar] = useState<string>('');
    const [copied, setCopied] = useState<boolean>(false);


    return (
        <div
            className="min-h-screen bg-gradient-to-br from-blue-400 via-black to-indigo-900 flex items-center justify-center p-4">
            {/* Retro scanlines effect */}
            <div className="fixed inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/5 to-transparent animate-pulse"></div>
            </div>

            <div className="relative w-full max-w-2xl">
                {/* Main terminal container */}
                <div
                    className="bg-black border-4 border-green-400 rounded-lg shadow-2xl shadow-green-400/50 overflow-hidden">
                    {/* Terminal header */}
                    <div className="bg-green-400 px-4 py-2 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Terminal className="w-5 h-5 text-black"/>
                            <span className="text-black font-mono font-bold">ETHEREUM MESSAGE SIGNER v2.0</span>
                        </div>
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                    </div>

                    {/* Terminal content */}
                    <div className="p-6 space-y-6">
                        {/* Status display */}
                        <div className="bg-gray-900 border border-green-400 rounded p-4 font-mono text-sm">
                            <div className="text-green-400 mb-2">SYSTEM STATUS:</div>
                            <div className="text-green-300">
                                {isConnected ? (
                                    <div className="flex items-center space-x-2">
                                        <Shield className="w-4 h-4 text-green-400" suppressHydrationWarning/>
                                        <span>WALLET CONNECTED: {address}</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-2">
                                        <Zap className="w-4 h-4 text-yellow-400" suppressHydrationWarning/>
                                        <span>WALLET NOT CONNECTED</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Connection section */}
                        {!isConnected && (
                            <div className="space-y-4">
                                <div className="text-green-400 font-mono text-lg mb-4">
                                    &gt; CONNECT YOUR WALLET TO CONTINUE
                                </div>
                                <button
                                    onClick={() => connect({connector: injected()})}
                                    disabled={isConnecting}
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-mono py-3 px-6 rounded border-2 border-pink-400 hover:border-pink-300 transition-all duration-300 hover:shadow-lg hover:shadow-pink-400/50 disabled:opacity-50"
                                >
                                    {isConnecting ? 'CONNECTING...' : 'CONNECT WALLET'}
                                </button>
                            </div>
                        )}

                        {/* Message signing interface */}
                        {isConnected && (
                            <div className="space-y-6">
                                <div className="text-green-400 font-mono text-lg mb-4">
                                    &gt; ENTER MESSAGE TO SIGN
                                </div>

                                {/* Message input */}
                                <div className="space-y-2">
                                    <label className="text-green-400 font-mono text-sm">MESSAGE:</label>
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="w-full bg-black border-2 border-green-400 rounded p-3 text-green-300 font-mono placeholder-green-500 focus:outline-none focus:border-green-300 focus:shadow-lg focus:shadow-green-400/30 resize-none"
                                        rows={4}
                                        placeholder="Enter your message here..."
                                    />
                                </div>

                                {/* Sign button */}
                                <button
                                    onClick={() => {
                                        console.log("Signing message:", message.trim());
                                        signMessage({message: message.trim()});
                                    }}
                                    disabled={!message.trim() || signingPending}
                                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-mono py-3 px-6 rounded border-2 border-green-400 hover:border-green-300 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {signingPending ?
                                        <span className="flex items-center justify-center space-x-2">
                                            <p>SIGNING MESSAGE</p> <LoaderPinwheel className='animate-spin'/>
                                        </span>
                                        : 'SIGN MESSAGE'}
                                </button>

                                {/* Signature display */}
                                {signature && (
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <label className="text-green-400 font-mono text-sm">SIGNATURE:</label>
                                            <button
                                                onClick={async (event) => {
                                                    event.preventDefault();
                                                    await navigator.clipboard.writeText(signature);
                                                    setCopied(true);
                                                    setTimeout(() => setCopied(false), 2000);
                                                }}
                                                className="flex items-center space-x-2 text-green-400 hover:text-green-300 font-mono text-sm transition-colors"
                                            >
                                                {copied ? (
                                                    <>
                                                        <CheckCircle className="w-4 h-4"/>
                                                        <span>COPIED!</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy className="w-4 h-4"/>
                                                        <span>COPY</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                        <div
                                            className="bg-gray-900 border border-green-400 rounded p-3 text-green-300 font-mono text-xs break-all">
                                            {signature || signingError}
                                        </div>
                                    </div>
                                )}

                                {/* Hash Message display */}
                                {hashMessageVar && (
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <label className="text-green-400 font-mono text-sm">HASH:</label>
                                            <button
                                                onClick={async (event) => {
                                                    event.preventDefault();
                                                    await navigator.clipboard.writeText(hashMessageVar);
                                                    setCopied(true);
                                                    setTimeout(() => setCopied(false), 2000);
                                                }}
                                                className="flex items-center space-x-2 text-green-400 hover:text-green-300 font-mono text-sm transition-colors"
                                            >
                                                {copied ? (
                                                    <>
                                                        <CheckCircle className="w-4 h-4"/>
                                                        <span>COPIED!</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy className="w-4 h-4"/>
                                                        <span>COPY</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                        <div
                                            className="bg-gray-900 border border-green-400 rounded p-3 text-green-300 font-mono text-xs break-all">
                                            {hashMessageVar}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Footer info */}
                        <div className="border-t border-green-400 pt-4">
                            <div className="text-green-500 font-mono text-xs text-center">
                                ETHEREUM MESSAGE SIGNING TERMINAL - SECURE CRYPTOGRAPHIC OPERATIONS
                            </div>
                        </div>
                    </div>
                </div>

                {/* Retro glow effect */}
                <div className="absolute inset-0 bg-green-400/20 rounded-lg blur-xl -z-10"></div>
            </div>
        </div>
    )

}

