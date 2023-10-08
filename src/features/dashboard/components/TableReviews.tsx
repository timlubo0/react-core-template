import { Table, Anchor, Text, Group, ScrollArea } from "src/components/base";

interface TableReviewsProps {
  data: {
    title: string;
    author: string;
    year: number;
    reviews: { positive: number; negative: number };
  }[];
}

export function TableReviews() {
  const rows = data.map((row) => {
    const totalReviews = row.reviews.negative + row.reviews.positive;
    const positiveReviews = (row.reviews.positive / totalReviews) * 100;
    const negativeReviews = (row.reviews.negative / totalReviews) * 100;

    return (
      <tr key={row.title}>
        <td>
          <Anchor fz="sm">
            {row.title}
          </Anchor>
        </td>
        <td>{row.year}</td>
        <td>
          <Anchor fz="sm">
            {row.author}
          </Anchor>
        </td>
        <td>{Intl.NumberFormat().format(totalReviews)}</td>
        <td>
          <Group align="apart">
            <Text fz="xs" c="teal" w={700}>
              {positiveReviews.toFixed(0)}%
            </Text>
            <Text fz="xs" c="red" w={700}>
              {negativeReviews.toFixed(0)}%
            </Text>
          </Group>
        </td>
      </tr>
    );
  });

  return (
    <ScrollArea>
      <Table verticalSpacing="xs">
        <thead>
          <tr>
            <th>Book title</th>
            <th>Year</th>
            <th>Author</th>
            <th>Reviews</th>
            <th>Reviews distribution</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}

const data = [
  {
    title: "Foundation",
    author: "Isaac Asimov",
    year: 1951,
    reviews: {
      positive: 2223,
      negative: 259,
    },
  },
  {
    title: "Frankenstein",
    author: "Mary Shelley",
    year: 1818,
    reviews: {
      positive: 5677,
      negative: 1265,
    },
  },
  {
    title: "Solaris",
    author: "Stanislaw Lem",
    year: 1961,
    reviews: {
      positive: 3487,
      negative: 1845,
    },
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    year: 1965,
    reviews: {
      positive: 8576,
      negative: 663,
    },
  },
  {
    title: "The Left Hand of Darkness",
    author: "Ursula K. Le Guin",
    year: 1969,
    reviews: {
      positive: 6631,
      negative: 993,
    },
  },
  {
    title: "A Scanner Darkly",
    author: "Philip K Dick",
    year: 1977,
    reviews: {
      positive: 8124,
      negative: 1847,
    },
  },
];
