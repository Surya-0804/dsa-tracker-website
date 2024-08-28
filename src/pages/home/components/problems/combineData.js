const combineData = (problemsData, userProgressData) => {
    // If userProgressData is undefined, return problemsData directly
    if (!userProgressData) {
        return problemsData;
    }

    const combinedData = {};

    for (const topic in problemsData) {
        combinedData[topic] = problemsData[topic].map(problem => {
            const { _id } = problem;

            // Check if the problem is bookmarked
            const isBookmarked = userProgressData.bookmarks.some(bookmark => bookmark.value === _id);

            // Check if the problem is a favorite
            const isFavourite = userProgressData.favourites.some(favourite => favourite.value === _id);

            // Get the notes associated with this problem
            const notesEntry = userProgressData.notes.find(note => note[0] === _id);
            const notes = notesEntry ? notesEntry[1] : [];

            // Get the solutions associated with this problem
            const solutionsEntry = userProgressData.solutions.find(solution => solution[0] === _id);
            const solutions = solutionsEntry ? solutionsEntry[1] : [];

            // Check if the problem is solved
            const isSolved = userProgressData.solvedProblems.some(solved => solved.value === _id);

            // Check if the problem is for revision
            const isRevision = userProgressData.revisionProblems.some(revision => revision.value === _id);

            return {
                ...problem,
                isBookmarked,
                isFavourite,
                notes,
                solutions,
                isSolved,
                isRevision
            };
        });
    }

    return combinedData;
};

export default combineData;
