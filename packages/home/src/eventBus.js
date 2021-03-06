import Vue from 'vue';

import invokeWhen from '@lincebi/biserver-frontend-common/src/invokeWhen';

const eventBus = new Vue();
eventBus.$emitWhen = (eventName, ...args) => {
	invokeWhen(
		() => eventBus._events[eventName],
		() => eventBus.$emit(eventName, ...args)
	);
};

export default eventBus;
