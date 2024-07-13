const combineData = (problemsData, userProgressData) => {
    const combinedData = {};

    for (const topic in problemsData) {
        combinedData[topic] = problemsData[topic].map(problem => {
            const { _id } = problem;
            const isBookmarked = userProgressData.bookmarks.includes(_id);
            const isFavourite = userProgressData.favourites.includes(_id);
            const notes = userProgressData.notes[_id] || [];
            const solutions = userProgressData.solutions[_id] || [];
            const isSolved = userProgressData.solvedProblems.includes(_id);
            const isUnsolved = userProgressData.unsolvedProblems.includes(_id);
            const isRevision = userProgressData.revisionProblems.includes(_id);

            return {
                ...problem,
                isBookmarked,
                isFavourite,
                notes,
                solutions,
                isSolved,
                isUnsolved,
                isRevision
            };
        });
    }

    return combinedData;
};

export default combineData;