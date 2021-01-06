import { useContext } from 'react';
import { ListContext } from '../contexts';

function useList() {
  return useContext(ListContext);
}

export default useList;
