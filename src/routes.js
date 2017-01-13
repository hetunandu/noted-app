import React from 'react';
import {
	Scene,
	Actions,
	ActionConst
} from 'react-native-router-flux';
import {
	LoginContainer,
	CourseContainer,
	SubjectsContainer,
	IndexContainer,
	ConceptsContainer,
	ResultContainer,
	PointsContainer,
	OfflineBuyContainer,
	OfflineContainer,
    PaymentContainer
} from './containers';

export default scenes = Actions.create(
	<Scene key="root"
		hideNavBar={true}
		panHandlers={null}
	>
		<Scene
			key="login"
			component={LoginContainer}
			initial={true}
			type={ActionConst.REPLACE}
		/>
		<Scene
			key="course"
			component={CourseContainer}
			panHandlers={null}
		/>
		<Scene
			key="subjects"
			component={SubjectsContainer}
			type={ActionConst.RESET}
		/>
		<Scene
			key="index"
			component={IndexContainer}
			panHandlers={null}
		/>
		<Scene
			key="concepts"
			component={ConceptsContainer}
			direction="vertical"
			panHandlers={null}
		/>
		<Scene
			key="results"
			component={ResultContainer}
			type={ActionConst.REPLACE}
		/>
		<Scene
			key="points"
			component={PointsContainer}
			panHandlers={null}
		/>
		<Scene
			key="offlineBuy"
			component={OfflineBuyContainer}
			panHandlers={null}
		/>
		<Scene
			key="payOnline"
			component={PaymentContainer}
			panHandlers={null}
		/>
		<Scene
			key="offlineReader"
			component={OfflineContainer}
			direction="vertical"
			panHandlers={null}
		/>
	</Scene>
);
