import { unlink } from 'fs/promises';
import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import HomePage from '../models/HomePage.js';


export const addSectionOne = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  let sectionOne = await HomePage.findOne({});
  if (!sectionOne) {
    sectionOne = await HomePage.create({ sectionOne: { title, description } });
    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      sectionOne: sectionOne.sectionOne,
    });
  }
  sectionOne.sectionOne = { title, description };
  await sectionOne.save();
  res.status(StatusCodes.OK).json({
    status: 'success',
    sectionOne: sectionOne.sectionOne,
  });
});

export const getSectionOne = asyncHandler(async (req, res) => {
  const sectionOne = await HomePage.findOne({});
  res.status(StatusCodes.OK).json({
    status: 'success',
    sectionOne:sectionOne?.sectionOne ?? null,
  });
})

export const addSectionTwo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  let sectionTwo = await HomePage.findOne({});
  if (!sectionTwo) {
    sectionTwo = await HomePage.create({ sectionTwo: { title, description } });
    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      sectionTwo: sectionTwo.sectionTwo,
    });
  }
  sectionTwo.sectionTwo = { title, description };
  await sectionTwo.save();
  res.status(StatusCodes.OK).json({
    status: 'success',
    sectionTwo: sectionTwo.sectionTwo,
  });
});

export const getSectionTwo = asyncHandler(async (req, res) => {
  const sectionTwo = await HomePage.findOne({});
  res.status(StatusCodes.OK).json({
    status: 'success',
    sectionTwo: sectionTwo?.sectionTwo ?? null,
  });
});

export const addSectionThree = asyncHandler(async (req, res) => {
  const images = [];
  let sectionThree = await HomePage.findOne({});
  if (!sectionThree) {
    req.files.map((file) => {
      const imgURL = `${process.env.BASE_URL}/section-three/${file.filename}`;
      images.push(imgURL);
    });
    sectionThree = await HomePage.create({ sectionThree: { images } });
    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      sectionThree: sectionThree.sectionThree,
    });
  }
  if (sectionThree.sectionThree?.images?.length > 0) {
    sectionThree.sectionThree.images.map(async (image) => {
      const imageName = image.split('/')[4];
      await unlink(`./uploads/section-three/${imageName}`);
    });
  }
  req.files.map((file) => {
    const imgURL = `${process.env.BASE_URL}/section-three/${file.filename}`;
    images.push(imgURL);
  });
  sectionThree.sectionThree = { images };
  await sectionThree.save();
  res.status(StatusCodes.OK).json({
    status: 'success',
    sectionThree: sectionThree.sectionThree,
  });
});

export const getSectionThree = asyncHandler(async (req, res) => {
  const sectionThree = await HomePage.findOne({});
  res.status(StatusCodes.OK).json({
    status: 'success',
    sectionThree: sectionThree?.sectionThree ?? null,
  });
});

export const addImgToSectionThree = asyncHandler(async (req, res) => {
  const sectionThree = await HomePage.findOne({});
  if (sectionThree.sectionThree?.images === undefined) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: 'fail',
      message: 'Section three not found',
    });
  }
  const imageURL = `${process.env.BASE_URL}/section-three/${req.file.filename}`;
  sectionThree.sectionThree.images.push(imageURL);
  await sectionThree.save();
  res.status(StatusCodes.OK).json({
    status: 'success',
    sectionThree: sectionThree.sectionThree,
  });
});

export const deleteImgFromSectionThree = asyncHandler(async (req, res) => {
  const sectionThree = await HomePage.findOne({});
  if (sectionThree.sectionThree?.images === undefined) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: 'fail',
      message: 'Section three not found',
    });
  }
  const imageName = req.body.imageName;
  const index = sectionThree.sectionThree.images.findIndex(
    (image) => image === imageName
  );
  if (index === -1) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: 'fail',
      message: 'Image not found',
    });
  }
  await unlink(`./uploads/section-three/${imageName.split('/')[4]}`);
  sectionThree.sectionThree.images.splice(index, 1);
  await sectionThree.save();
  res.status(StatusCodes.OK).json({
    status: 'success',
    sectionThree: sectionThree.sectionThree,
  });
});

export const addSectionFour = asyncHandler(async (req, res) => {
  const { mainTitle, sections } = req.body;
  let sectionFour = await HomePage.findOne({});
  if (!sectionFour) {
    if (req.files.length > 0) {
      sections.map((section, index) => {
        if (req.files[index]) {
          section.icon = `${process.env.BASE_URL}/section-four/${req.files[index].filename}`;
        }
      });
    }
    sectionFour = await HomePage.create({ sectionFour: { mainTitle, sections } });
    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      sectionFour: sectionFour.sectionFour,
    });
  };
  if(sectionFour.sectionFour?.sections?.length > 0) {
    sectionFour.sectionFour.sections.map(async (section) => {
      if (section.icon) {
        const imageName = section.icon.split('/')[4];
        await unlink(`./uploads/section-four/${imageName}`);
      }
    });
  }
  if (req.files.length > 0) {
    sections.map((section, index) => {
      if (req.files[index]) {
        section.icon = `${process.env.BASE_URL}/section-four/${req.files[index].filename}`;
      }
    })
  }
  sectionFour.sectionFour = { mainTitle, sections };
  await sectionFour.save();
  res.status(StatusCodes.OK).json({
    status: 'success',
    sectionFour: sectionFour.sectionFour,
  });
});

export const addToSectionFour = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  let sectionFour = await HomePage.findOne({});
  if (!sectionFour.sectionFour?.sections === undefined) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: 'fail',
      message: `Section four not found`,
    });
  };
  let icon;
  if (req.file) {
    icon = `${process.env.BASE_URL}/section-four/${req.file.filename}`;
  };
  sectionFour.sectionFour.sections.push({ icon, title, description });
  await sectionFour.save();
  res.status(StatusCodes.OK).json({
    status: 'success',
    sectionFour: sectionFour.sectionFour,
  });
});

export const deleteFromSectionFour = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let sectionFour = await HomePage.findOne({});
  if (!sectionFour.sectionFour?.sections === undefined) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: 'fail',
      message: `Section four not found`,
    });
  };
  const index = sectionFour.sectionFour.sections.findIndex((section) => section._id == id);
  if (index === -1) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: 'fail',
      message: `Section not found`,
    });
  };
  if (sectionFour.sectionFour.sections[index].icon) {
    await unlink(`./uploads/section-four/${sectionFour.sectionFour.sections[index].icon.split('/')[4]}`);
  };
  sectionFour.sectionFour.sections.splice(index, 1);
  await sectionFour.save();
  res.status(StatusCodes.OK).json({
    status: 'success',
    sectionFour: sectionFour.sectionFour,
  });
});

export const getSectionFour = asyncHandler(async (req, res) => {
  const sectionFour = await HomePage.findOne({});
  res.status(StatusCodes.OK).json({
    status: 'success',
    sectionFour: sectionFour?.sectionFour ?? null,
  });
});

export const addSectionFive = asyncHandler(async (req, res) => {
  const { mainTitle, sections } = req.body;
  let image;
  let sectionFive = await HomePage.findOne({});
  if (!sectionFive) {
    if (req.file)
      image = `${process.env.BASE_URL}/section-five/${req.file.filename}`;
    sectionFive = await HomePage.create({ sectionFive: { mainTitle, image, sections } });
    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      sectionFive: sectionFive.sectionFive,
    });
  }
  if (sectionFive.sectionFive?.image) {
    const imageName = sectionFive.sectionFive.image.split('/')[4];
    await unlink(`./uploads/section-five/${imageName}`);
  }
  if (req.file)
    image = `${process.env.BASE_URL}/section-five/${req.file.filename}`;
  sectionFive.sectionFive = { mainTitle, image, sections };
  await sectionFive.save();
  res.status(StatusCodes.OK).json({
    status: 'success',
    sectionFive: sectionFive.sectionFive,
  });
});

export const addToSectionFive = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if (!title && !description) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: 'fail',
      message: `enter title or description`,
    });
  }
  let sectionFive = await HomePage.findOne({});
  if (!sectionFive.sectionFive?.sections === undefined) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: 'fail',
      message: `Section five not found`,
    });
  };
  sectionFive.sectionFive.sections.push({ title, description });
  await sectionFive.save();
  res.status(StatusCodes.OK).json({
    status: 'success',
    sectionFive: sectionFive.sectionFive,
  });
});

export const deleteFromSectionFive = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let sectionFive = await HomePage.findOne({});
  if (!sectionFive.sectionFive?.sections === undefined) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: 'fail',
      message: `Section five not found`,
    });
  };
  const index = sectionFive.sectionFive.sections.findIndex((section) => section._id == id);
  if (index === -1) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: 'fail',
      message: `Section not found`,
    });
  };
  sectionFive.sectionFive.sections.splice(index, 1);
  await sectionFive.save();
  res.status(StatusCodes.OK).json({
    status: 'success',
    sectionFive: sectionFive.sectionFive,
  });
});

export const getSectionFive = asyncHandler(async (req, res) => {
  const sectionFive = await HomePage.findOne({});
  res.status(StatusCodes.OK).json({
    status: 'success',
    sectionFive: sectionFive?.sectionFive ?? null,
  });
});

export const addSectionSix = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const image = `${process.env.BASE_URL}/section-six/${req.file.filename}`;
  let sectionSix = await HomePage.findOne({});
  if (!sectionSix) {
    sectionSix = await HomePage.create({ sectionSix: { title, image } });
    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      sectionSix: sectionSix.sectionSix,
    });
  }
  if (sectionSix.sectionSix?.image) {
    const imageName = sectionSix.sectionSix.image.split('/')[4];
    await unlink(`./uploads/section-six/${imageName}`);
  }
  sectionSix.sectionSix = { title, image };
  await sectionSix.save();
  res.status(StatusCodes.OK).json({
    status: 'success',
    sectionSix: sectionSix.sectionSix,
  });
});

export const getSectionSix = asyncHandler(async (req, res) => {
  const sectionSix = await HomePage.findOne({});
  res.status(StatusCodes.OK).json({
    status: 'success',
    sectionSix: sectionSix?.sectionSix ?? null,
  });
});

export const getHomepage = asyncHandler(async (req, res) => {
  const homepage = await HomePage.findOne({});
  res.status(StatusCodes.OK).json({
    status: 'success',
    homepage: homepage ?? null,
  });
})