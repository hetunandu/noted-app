import React from 'react';
import { 
	LoginContainer,
	SubjectsContainer,
	IndexContainer 
} from './containers';
// import LoginDetails from './components/LoginDetails';
// import Subjects from './components/Subjects';
// import ConceptReader from './components/ConceptReader';
// import SubjectIndex from './components/SubjectIndex';
// import Result from './components/Result';
// import Home from './components/Home';
// import Points from './components/Points';
import {
	Scene,
	Actions,
	ActionConst
} from 'react-native-router-flux';

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
	</Scene>
);
