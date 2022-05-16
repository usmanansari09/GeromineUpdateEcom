import React from "react";
import Select from "@/components/Select";
const STATE_DATA = [
    {
        label: "AL",
        value: "AL",
        key: "AL",
    },
    {
        label: "AK",
        value: "AK",
        key: "AK",
    },
    {
        label: "AS",
        value: "AS",
        key: "AS",
    },
    {
        label: "AZ",
        value: "AZ",
        key: "AZ",
    },
    {
        label: "AR",
        value: "AR",
        key: "AR",
    },
    {
        label: "CA",
        value: "CA",
        key: "CA",
    },
    {
        label: "CO",
        value: "CO",
        key: "CO",
    },
    {
        label: "CT",
        value: "CT",
        key: "CT",
    },
    {
        label: "DE",
        value: "DE",
        key: "DE",
    },
    {
        label: "DC",
        value: "DC",
        key: "DC",
    },
    {
        label: "FM",
        value: "FM",
        key: "FM",
    },
    {
        label: "FL",
        value: "FL",
        key: "FL",
    },
    {
        label: "GA",
        value: "GA",
        key: "GA",
    },
    {
        label: "GU",
        value: "GU",
        key: "GU",
    },
    {
        label: "HI",
        value: "HI",
        key: "HI",
    },
    {
        label: "ID",
        value: "ID",
        key: "ID",
    },
    {
        label: "IL",
        value: "IL",
        key: "IL",
    },
    {
        label: "IN",
        value: "IN",
        key: "IN",
    },
    {
        label: "IA",
        value: "IA",
        key: "IA",
    },
    {
        label: "KS",
        value: "KS",
        key: "KS",
    },
    {
        label: "KY",
        value: "KY",
        key: "KY",
    },
    {
        label: "LA",
        value: "LA",
        key: "LA",
    },
    {
        label: "ME",
        value: "ME",
        key: "ME",
    },
    {
        label: "MH",
        value: "MH",
        key: "MH",
    },
    {
        label: "MD",
        value: "MD",
        key: "MD",
    },
    {
        label: "MA",
        value: "MA",
        key: "MA",
    },
    {
        label: "MI",
        value: "MI",
        key: "MI",
    },
    {
        label: "MN",
        value: "MN",
        key: "MN",
    },
    {
        label: "MS",
        value: "MS",
        key: "MS",
    },
    {
        label: "MO",
        value: "MO",
        key: "MO",
    },
    {
        label: "MT",
        value: "MT",
        key: "MT",
    },
    {
        label: "NE",
        value: "NE",
        key: "NE",
    },
    {
        label: "NV",
        value: "NV",
        key: "NV",
    },
    {
        label: "NH",
        value: "NH",
        key: "NH",
    },
    {
        label: "NJ",
        value: "NJ",
        key: "NJ",
    },
    {
        label: "NM",
        value: "NM",
        key: "NM",
    },
    {
        label: "NY",
        value: "NY",
        key: "NY",
    },
    {
        label: "NC",
        value: "NC",
        key: "NC",
    },
    {
        label: "ND",
        value: "ND",
        key: "ND",
    },
    {
        label: "MP",
        value: "MP",
        key: "MP",
    },
    {
        label: "OH",
        value: "OH",
        key: "OH",
    },
    {
        label: "OK",
        value: "OK",
        key: "OK",
    },
    {
        label: "OR",
        value: "OR",
        key: "OR",
    },
    {
        label: "PW",
        value: "PW",
        key: "PW",
    },
    {
        label: "PA",
        value: "PA",
        key: "PA",
    },
    {
        label: "PR",
        value: "PR",
        key: "PR",
    },
    {
        label: "RI",
        value: "RI",
        key: "RI",
    },
    {
        label: "SC",
        value: "SC",
        key: "SC",
    },
    {
        label: "SD",
        value: "SD",
        key: "SD",
    },
    {
        label: "TN",
        value: "TN",
        key: "TN",
    },
    {
        label: "TX",
        value: "TX",
        key: "TX",
    },
    {
        label: "UT",
        value: "UT",
        key: "UT",
    },
    {
        label: "VT",
        value: "VT",
        key: "VT",
    },
    {
        label: "VI",
        value: "VI",
        key: "VI",
    },
    {
        label: "VA",
        value: "VA",
        key: "VA",
    },
    {
        label: "WA",
        value: "WA",
        key: "WA",
    },
    {
        label: "WV",
        value: "WV",
        key: "WV",
    },
    {
        label: "WI",
        value: "WI",
        key: "WI",
    },
    {
        label: "WY",
        value: "WY",
        key: "WY",
    },
];
export default function StateField({ onChange, onBlur, value, error }) {
    return (
        <Select
            label="State"
            type="underline"
            size="sm"
            theme="secondary"
            onValueChange={onChange}
            value={value}
            onvalue={onBlur}
            items={STATE_DATA}
            placeholder=""
            errorMessage={error}
        />
    );
}
