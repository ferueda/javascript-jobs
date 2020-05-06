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
];

export const setCompanyLogoFromName = (companyName) => {
  const companyNameArray = companyName.split(' ');
  if (companyNameArray.length > 1) {
    return `${companyNameArray[0][0]}${companyNameArray[1][0]}`;
  } else {
    return `${companyName.slice(0, 2)}`;
  }
};

export const filterJobs = (jobs, filter) => {
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
      keys: ['job_title', 'content_text'],
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

export const getDateDiff = (d1, d2) => {
  const utc1 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate());
  const utc2 = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate());

  return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
};
