import React from "react";

export const navigationRef = React.createRef();

export function goBack() {
   navigationRef?.current?.goBack();
}

export function navigateTo(uri, param) {
   navigationRef?.current?.navigate(uri, param);
}
