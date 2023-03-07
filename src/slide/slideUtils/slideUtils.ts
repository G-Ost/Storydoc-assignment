export function swapArrayElements<T>(array: T[], index1: number, index2: number): T[] {
	let temp = array[index1];
	array[index1] = array[index2];
	array[index2] = temp;
	return array;
}