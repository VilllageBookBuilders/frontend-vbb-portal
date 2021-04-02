const ACTION_TYPE = 'actionType';

// action exported and then imported to and exported from `src/redux/actions/index.js`
export const actionVerbUsedToDescribeAction = (payload) => {
  return { type: ACTION_TYPE, payload: payload };
};
