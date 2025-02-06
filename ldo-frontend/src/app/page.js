"use client";
import React, { useEffect } from "react";
import { getLocation } from "current-location-geo";
import Hero from "@/components/Hero";
import DashboardFacts from "@/components/DashboardFacts";
import Introduction from "@/components/Introduction";
import WhatWeDo from "@/components/WhatWeDo";
import PortalGroup from "@/components/PortalGroup";
import NewsSlider from "@/components/NewsSlider";
import SlickSlider from "@/components/SlickSlider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EmbassyContainer from "@/components/EmbassyContainer";
import { HOST_NAME, API_HOST } from "../constants"; // Added by Nitin

export default function Home() {
    useEffect(() => {
        // Fetch the visitor's IP and send it to the backend
        const sendVisitorIP = async () => {
            try {
                const response = await fetch(
                    "https://api.ipify.org?format=json"
                );
                const data = await response.json();
                const visitorIP = data.ip;

                // Call the Laravel GET API to store the IP
                await fetch(API_HOST + "store-visitor-ip", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Visitor-IP": visitorIP // Custom header to pass the IP
                    }
                });
            } catch (error) {
                console.error("Failed to send visitor IP:", error);
            }
        };

        // Call the function to send visitor IP
        sendVisitorIP();

        // Retain the existing getLocation logic
        getLocation(function(err, position) {
            if (err) {
                console.error("Error getting location:", err);
            } else {
                console.log("Location data:", position);
            }
        });
    }, []);

    return (
        <div className="Homepage">
            <NewsSlider />
            <Hero />
            <PortalGroup />
            <DashboardFacts />
            <Introduction />
            {/* Diwakar Sinha */}
            <SlickSlider />
            <WhatWeDo />
            {/* Diwakar Sinha */}
            <EmbassyContainer />
        </div>
    );
}
