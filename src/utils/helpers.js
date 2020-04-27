import Fuse from 'fuse.js';

export const techFilters = [
  'Front end',
  'Back end',
  'JavaScript',
  'React',
  'Vue',
  'Angular',
  'Node',
  'TypeScript',
  'Gatsby',
];

export const setCompanyLogoFromName = (companyName) => {
  const companyNameArray = companyName.split(' ');
  if (companyNameArray.length > 1) {
    return `${companyNameArray[0][0]}${companyNameArray[1][0]}`;
  } else {
    return `${companyName.slice(0, 2)}`;
  }
};

export const jobsToShow = (jobs, filter) => {
  if (!filter.length) {
    return jobs;
  }

  if (
    filter.every((f) => techFilters.map((t) => t.toLowerCase()).includes(f))
  ) {
    return jobs.filter((job) =>
      filter.every((f) => job.tags.includes(f.toLowerCase()))
    );
  } else {
    const options = {
      useExtendedSearch: true,
      keys: ['jobTitle', 'content'],
    };

    const fuse = new Fuse(jobs, options);

    const modFilters = filter.map((f) => `'${f}`).join(' ');

    const fuseResult = fuse.search(modFilters);

    const tagSearch = jobs.filter((job) =>
      filter.every((f) => job.tags.includes(f.toLowerCase()))
    );

    const idArray = fuseResult.map((job) => job.item.id);

    tagSearch.forEach((job) => {
      if (!idArray.includes(job.id)) {
        idArray.push(job.id);
      }
    });

    return jobs.filter((job) => idArray.includes(job.id));
  }
};
