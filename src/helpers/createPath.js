import fs from 'fs/promises';

const createPathIfNotExist = async (path) => {
  try {
    await fs.access(path);
  } catch (error) {
    await fs.mkdir(path);
  }
};

export default createPathIfNotExist;
