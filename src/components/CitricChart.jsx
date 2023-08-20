// TradingViewWidget.jsx

import React, { useEffect, useRef } from 'react';

let tvScriptLoadingPromise;

export default function CitricChart() {
    const onLoadScriptRef = useRef();

    useEffect(
        () => {
            onLoadScriptRef.current = createWidget;

            if (!tvScriptLoadingPromise) {
                tvScriptLoadingPromise = new Promise((resolve) => {
                    const script = document.createElement('script');
                    script.id = 'tradingview-widget-loading-script';
                    script.src = 'https://s3.tradingview.com/tv.js';
                    script.type = 'text/javascript';
                    script.onload = resolve;

                    document.head.appendChild(script);
                });
            }

            tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

            return () => onLoadScriptRef.current = null;

            function createWidget() {
                if (document.getElementById('tradingview_b3dcb') && 'TradingView' in window) {
                    new window.TradingView.widget({
                        autosize: true,
                        symbol: "HKEX:267",
                        interval: "D",
                        timezone: "Etc/UTC",
                        theme: "dark",
                        style: "1",
                        locale: "en",
                        enable_publishing: false,
                        allow_symbol_change: true,
                        container_id: "tradingview_b3dcb"
                    });
                }
            }
        },
        []
    );

    return (
        <div className='tradingview-widget-container'>
            <div className='tradingview-chart' id='tradingview_b3dcb' />
        </div>
    );
}