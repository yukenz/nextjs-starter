import {ConnectButton} from "@rainbow-me/rainbowkit";
import React from "react";
import {Zap} from "lucide-react";

export function RetroConnectButton() {

    return (
        <ConnectButton.Custom>
            {
                // callback
                ({
                     account,
                     chain,
                     openAccountModal,
                     openChainModal,
                     openConnectModal,
                     authenticationStatus,
                     mounted,
                 }) => {
                    // Note: If your app doesn't use authentication, you
                    // can remove all 'authenticationStatus' checks
                    const ready = mounted && authenticationStatus !== 'loading';
                    const connected =
                        ready &&
                        account &&
                        chain &&
                        (!authenticationStatus ||
                            authenticationStatus === 'authenticated');

                    return (
                        <div
                            {...
                                (!ready && {
                                    'aria-hidden': true,
                                    'style': {
                                        opacity: 0,
                                        pointerEvents: 'none',
                                        userSelect: 'none',
                                    },
                                })
                            }
                        >
                            <div className="md:flex items-center space-x-4">
                                {
                                    (() => {

                                            // Return Case 1
                                            if (!connected) {
                                                return (
                                                    <div
                                                        className="flex items-center space-x-2 bg-gray-900 border border-blue-400 rounded px-3 py-1">
                                                        <button onClick={openConnectModal} type="button">
                                                            Connect Wallet
                                                        </button>
                                                    </div>
                                                );
                                            }

                                            // Return Case 2
                                            if (chain.unsupported) {
                                                return (
                                                    <div
                                                        className="flex items-center space-x-2 bg-gray-900 border border-blue-400 rounded px-3 py-1">
                                                        <button onClick={openChainModal} type="button">
                                                            Wrong network
                                                        </button>
                                                    </div>
                                                );
                                            }

                                            // Return Case 3 : Connected
                                            return (
                                                <>

                                                    {/* Div Icon */}
                                                    <div
                                                        className="flex items-center space-x-2 bg-gray-900 border border-blue-400 rounded px-3 py-1">
                                                        <button
                                                            onClick={openChainModal}
                                                            className='flex items-center'
                                                            type="button"
                                                        >
                                                            {chain.hasIcon && (
                                                                <div
                                                                    className="w-[24px] h-[24px] rounded-4xl overflow-hidden mr-4 animate-spin"
                                                                    style={{background: chain.iconBackground}}
                                                                >
                                                                    {chain.iconUrl && (
                                                                        <img
                                                                            alt={chain.name ?? 'Chain icon'}
                                                                            src={chain.iconUrl}
                                                                        />
                                                                    )}
                                                                </div>
                                                            )}
                                                            {chain.name}
                                                        </button>

                                                    </div>

                                                    {/* Div Address*/}
                                                    <div
                                                        className="flex items-center space-x-2 bg-gray-900 border border-blue-400 rounded px-3 py-1">
                                                        <Zap className="w-4 h-4 text-blue-400 animate-pulse"/>
                                                        <button onClick={openAccountModal} type="button">
                                                            {account.displayName}
                                                            {(() => {

                                                                    const {displayBalance} = account;
                                                                    return displayBalance ?? '';

                                                                }
                                                            )()}
                                                        </button>
                                                    </div>
                                                </>
                                            );
                                        }
                                    )()
                                }
                            </div>
                        </div>
                    );
                }
            }
        </ConnectButton.Custom>
    );

}