import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"


@Entity("movies")
export class Movie {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ name: "title", type: "varchar" })
  title?: string

  @Column({ name: "gender", type: "varchar" })
  gender?: string

  @Column({ name: "classification", type: "varchar" })
  classification?: string

  @Column({ name: "subtitle", type: "varchar" })
  subtitle?: string

  @Column({ name: "image", type: "varchar" })
  image?: string

  @Column({ name: "releasedate", type: "varchar" })
  releasedate?: string

  @Column({ name: "director", type: "varchar" })
  director?: string

  @Column({ name: "writer", type: "varchar" })
  writer?: string

  @Column({ name: "studio", type: "varchar" })
  studio?: string

  @Column({ name: "actors", type: "varchar" })
  actors?: string

  @Column({ name: "resume", type: "text" })
  resume?: string

  @Column({ name: "awards", type: "varchar" })
  awards?: string

  @Column({ name: "note", type: "int" })
  note?: number
}

