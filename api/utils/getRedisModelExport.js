const { client } = require("../redis");

module.exports = async (schema) => {
	const repo = client.fetchRepository(schema);

	if (process.env.NODE_ENV !== "production") {
		const allIds = await repo.search().returnAllIds();
		allIds.forEach((id) => repo.remove(id));
	}

	await repo.createIndex();
	return repo;
};
