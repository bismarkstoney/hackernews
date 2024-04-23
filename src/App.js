import { useState } from 'react';
import { useEffect } from 'react';
const stories = [
	{
		title: 'React',
		url: 'https://reactjs.org/',
		author: 'Jordan Walke',
		num_comments: 3,
		points: 4,
		objectID: 0,
	},
	{
		title: 'Redux',
		url: 'https://redux.js.org/',
		author: 'Dan Abramov, Andrew Clark',
		num_comments: 2,
		points: 5,
		objectID: 1,
	},
];
const App = () => {
	const [searchTerm, setSearchTerm] = useState('React');
	const [stories1, setStories] = useState(stories);
	const handleChange = (e) => {
		setSearchTerm(e.target.value);
	};
	useEffect(() => {
		localStorage.setItem('search', searchTerm);
	}, [searchTerm]);
	const handleRemove = (item) => {
		const newStories = stories1.filter(
			(story) => item.objectID !== story.objectID
		);
		setStories(newStories);
	};
	const searchedStories = stories.filter((story) =>
		story.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div>
			<InputWithLabel
				id='search'
				label='search'
				value={searchTerm}
				isFocused
				onInputChange={handleChange}>
				<strong>Search</strong>
			</InputWithLabel>
			<hr />
			<List list={searchedStories} onRemovedItem={handleRemove} />
		</div>
	);
};

export default App;

const List = ({ list, onRemovedItem }) => {
	return (
		<ul>
			{list.map((item) => (
				<Item key={item.objectID} item={item} onRemovedItem={onRemovedItem} />
			))}
		</ul>
	);
};
const Item = ({ item, onRemovedItem }) => {
	const handleRemovedItem = () => {
		onRemovedItem(item);
		console.log('clicked');
	};

	return (
		<li>
			<span>
				<a href={item.url}>{item.title}</a>
			</span>
			<span>{item.author}</span>
			<span>{item.num_comments}</span>
			<span>{item.points}</span>
			<span>
				<button type='button' onClick={handleRemovedItem}>
					Dismiss
				</button>
			</span>
		</li>
	);
};

const InputWithLabel = ({
	id,
	label,
	value,
	onInputChange,
	type = 'text',
	children,
	isFocused,
}) => {
	return (
		<>
			<label htmlFor={id}>{children} </label>
			<input
				type={type}
				id={id}
				onChange={onInputChange}
				value={value}
				autoFocus={isFocused}
			/>
		</>
	);
};
