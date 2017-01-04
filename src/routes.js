import React from 'react';
import {
	Scene,
	Actions,
	ActionConst
} from 'react-native-router-flux';
import { 
	LoginContainer,
	SubjectsContainer,
	IndexContainer,
	ConceptsContainer,
	ResultContainer,
	PointsContainer
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
			key="subjects"
			component={SubjectsContainer}
			type={ActionConst.REPLACE}
		/>
		<Scene
			key="index"
			component={IndexContainer}
			direction="vertical"
		/>
		<Scene
			key="concepts"
			component={ConceptsContainer}
		/>
		<Scene
			key="results"
			component={ResultContainer}
			type={ActionConst.REPLACE}
		/>
		<Scene
			key="points"
			component={PointsContainer}
			direction="vertical"
		/>
	</Scene>
);
