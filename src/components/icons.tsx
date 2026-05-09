import { Icon } from "@iconify/react";
import React from "react"

export const EnvelopeSVG = () => {
    return (
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="envelope" className="svg-inline--fa fa-envelope fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path>
        </svg>
    );
};


export function IssueIcon({ closed, color: customColor }: { closed: boolean, color?: string }) {
    const icon = closed ? "octicon:issue-closed-16" : "octicon:issue-opened-16";
    const defaultColor = closed ? "text-purple-700" : "text-green-600";
    const color = customColor || defaultColor;

    return (
        <Icon icon={icon} className={`inline w-4 h-4 ${color} align-middle`} />
    );
}

export enum PrState {
    merged,
    open,
    closed
}

export function stringToPrState(state: string): PrState {
    const upperState = state.toUpperCase();
    switch (upperState) {
        case 'MERGED':
            return PrState.merged;
        case 'OPEN':
            return PrState.open;
        case 'CLOSED':
            return PrState.closed;
        default:
            return PrState.closed;
    }
}

export function PrIcon({ state }: { state: PrState }) {
    const config = {
        [PrState.merged]: {
            icon: "octicon:git-merge-16",
            color: "text-purple-700"
        },
        [PrState.open]: {
            icon: "octicon:git-pull-request-16",
            color: "text-green-700"
        },
        [PrState.closed]: {
            icon: "octicon:git-pull-request-16",
            color: "text-red-700"
        }
    };

    const { icon, color } = config[state];

    return (
        <Icon icon={icon} className={`inline w-4 h-4 ${color} align-middle`} />
    );
}