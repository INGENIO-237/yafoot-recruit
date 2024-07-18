"use client";

import { useForm } from "react-hook-form";
import { nativeEnum, number, object, optional, string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Cities from "./Cities";
import Positions from "./Positions";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Link from "next/link";
import { CITIES, POSITIONS, STRONG_FOOT } from "@/lib/enums";
import { toast } from "react-toastify";
import { useRegisterCandidate } from "@/lib/data/candidates";
import LoadingButton from "../ui/Loading";
import StrongFoot from "./StrongFoot";

const ApplicationSchema = object({
  firstname: optional(string()),
  lastname: string({ required_error: "Le nom est obligatoire" }),
  phone: string({
    required_error: "Le numéro de téléphone est requis",
    invalid_type_error: "Le numéro de téléphone est invalide",
  }),
  dob: string({ required_error: "La date de naissance est obligatoire" }).date(
    "La date est invalide"
  ),
  pob: string({
    required_error: "Le lieu de naissance est obligatoire",
  }),
  address: string({
    required_error: "Le quartier est obligatoire",
    invalid_type_error: "Address must be a string",
  }),
  email: string({ required_error: "L'email est obligatoire" }).email(
    "Invalid email format"
  ),
  height: string({ required_error: "La taille est obligatoire" }),
  weight: string({ required_error: "Le poids est obligatoire" }),
  practiceLevel: string({
    required_error: "Le niveau de pratique est obligatoire",
  }),
  category: string({ required_error: "La catégorie est obligatoire" }),
});

export type ApplicationData = z.infer<typeof ApplicationSchema>;

export default function ApplicationForm({
  setIsSuccess,
}: {
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
}) {
  const [next, setNext] = useState(false);

  const [city, setCity] = useState("");
  const [strongFoot, setStrongFoot] = useState("");
  const [position, setPosition] = useState("");

  const [club1, setClub1] = useState({
    start: "",
    end: "",
    name: "",
  });
  const [club2, setClub2] = useState({
    start: "",
    end: "",
    name: "",
  });
  const [club3, setClub3] = useState({
    start: "",
    end: "",
    name: "",
  });

  const { registerCandidate, isLoading, isSuccess, data, error } =
    useRegisterCandidate();

  useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem("pk", data.publicId);
      toast.success("Enregistré avec succès. Redirection...");

      setTimeout(() => {
        setIsSuccess(true);
      }, 5000);
    }

    if (error) {
      const errors = error?.response?.data;

      if (errors) {
        errors.map((err: any) => toast.error(err.message as string));
      } else {
        toast.error("Quelque chose s'est mal passé. Veuillez réessayer.");
      }
    }
  }, [isSuccess, data, error, setIsSuccess]);

  const form = useForm<ApplicationData>({
    resolver: zodResolver(ApplicationSchema),
  });

  const { control, handleSubmit } = form;

  const now = new Date();
  const year = now.getFullYear();

  async function onSubmit(data: ApplicationData) {
    // Populate clubs
    const clubs = [];

    if (club1.start !== "" && club1.end !== "" && club1.name !== "")
      clubs.push({
        ...club1,
        start: Number(club1.start),
        end: Number(club1.end),
      });
    if (club2.start !== "" && club2.end !== "" && club2.name !== "")
      clubs.push({
        ...club2,
        start: Number(club2.start),
        end: Number(club2.end),
      });
    if (club3.start !== "" && club3.end !== "" && club3.name !== "") {
      clubs.push({
        ...club3,
        start: Number(club3.start),
        end: Number(club3.end),
      });
    }

    if(clubs.length > 0){
      (
        data as ApplicationData & {
          city: string;
          position: string;
          strongFoot: string;
          clubs?: { start: number; end: number; name: string }[];
        }
      ).clubs = clubs;
    }

    (
      data as ApplicationData & {
        city: string;
        position: string;
        strongFoot: string;
        clubs?: { start: number; end: number; name: string }[];
      }
    ).city = city;
    (
      data as ApplicationData & {
        city: string;
        position: string;
        strongFoot: string;
        clubs?: { start: number; end: number; name: string }[];
      }
    ).position = position;
    (
      data as ApplicationData & {
        city: string;
        position: string;
        strongFoot: string;
        clubs?: { start: number; end: number; name: string }[];
      }
    ).strongFoot = strongFoot;

    const finalData = { ...data } as ApplicationData & {
      city: string;
      position: string;
      strongFoot: string;
    };

    const errors = [];

    if (
      !Object.values(CITIES).includes(
        (
          data as ApplicationData & {
            city: string;
            position: string;
            strongFoot: string;
          }
        ).city as CITIES
      )
    )
      errors.push("Ville invalide");
    if (
      !Object.values(STRONG_FOOT).includes(
        (
          data as ApplicationData & {
            city: string;
            position: string;
            strongFoot: string;
          }
        ).strongFoot as STRONG_FOOT
      )
    )
      errors.push("Pied fort invalide");
    if (
      !Object.values(POSITIONS).includes(
        (
          data as ApplicationData & {
            city: string;
            position: string;
            strongFoot: string;
          }
        ).position as POSITIONS
      )
    )
      errors.push("Poste invalide");

    if (!isValidPhoneNumber(data.phone))
      errors.push("Numéro de téléphone invalide");

    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
    } else {
      // Send data to backend
      await registerCandidate(finalData);
      // toast.success("Success");
      // console.log({ finalData });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3 bg-gray-500/40 px-3 py-5 rounded backdrop-blur-lg w-full max-w-[500px] mb-20"
      >
        <div>
          <h1 className="text-3xl md:text-4xl">
            Il est temps de{" "}
            <span className="text-secondary-hover font-bold">
              poursuivre ton rêve
            </span>
          </h1>
          <p className="text-white/60">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </p>
        </div>

        {/* First part */}
        {!next && (
          <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
              <FormField
                control={control}
                name="firstname"
                render={({ field }) => (
                  <FormItem className="md:w-[45%]">
                    <FormLabel className="font-medium capitalize">
                      Prénom
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Prénom"
                        className="text-black"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="lastname"
                render={({ field }) => (
                  <FormItem className="md:w-[45%]">
                    <FormLabel className="font-medium capitalize">
                      Nom
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nom"
                        className="text-black"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem className="md:w-[45%]">
                    <FormLabel className="font-medium capitalize">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        className="text-black"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="md:w-[45%]">
                    <FormLabel className="font-medium">
                      Numéro de téléphone
                    </FormLabel>
                    <FormControl>
                      <PhoneInput
                        placeholder="Numéro de téléphone"
                        {...field}
                        // className="px-3 py-2 text-black w-full"
                        numberInputProps={{
                          className:
                            " w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 text-black",
                        }}
                        defaultCountry="CM"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
              <FormItem className="flex flex-col md:w-[45%]">
                <FormLabel className="font-medium capitalize">Ville</FormLabel>
                <FormControl>
                  <Cities value={city} setCity={setCity} />
                </FormControl>
              </FormItem>
              <FormField
                control={control}
                name="address"
                render={({ field }) => (
                  <FormItem className="md:w-[45%]">
                    <FormLabel className="font-medium capitalize">
                      Quartier
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Quartier"
                        className="text-black"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
              <FormField
                control={control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="md:w-[45%]">
                    <FormLabel className="font-medium">
                      Date de naissance
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Date de naissance"
                        className="text-black w-full"
                        {...field}
                        type="date"
                        max={`${year - 17}-12-31`}
                        min={`${year - 25}-12-31`}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="pob"
                render={({ field }) => (
                  <FormItem className="md:w-[45%]">
                    <FormLabel className="font-medium">
                      Lieu de naissance
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Lieu de naissance"
                        className="text-black"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        )}

        {/* Second part */}
        {next && (
          <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
              <FormItem className="flex flex-col md:w-[45%]">
                <FormLabel className="font-medium ">Pied fort</FormLabel>
                <FormControl>
                  <StrongFoot
                    value={strongFoot}
                    setStrongFoot={setStrongFoot}
                  />
                </FormControl>
              </FormItem>
              <FormItem className="flex flex-col md:w-[45%]">
                <FormLabel className="font-medium capitalize">Poste</FormLabel>
                <FormControl>
                  <Positions value={position} setPosition={setPosition} />
                </FormControl>
              </FormItem>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
              <FormField
                control={control}
                name="height"
                render={({ field }) => (
                  <FormItem className="md:w-[45%]">
                    <FormLabel className="font-medium">Taille</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Taille"
                        className="text-black w-full"
                        {...field}
                        type="number"
                        min={1.6}
                        max={2.3}
                        step={0.01}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="weight"
                render={({ field }) => (
                  <FormItem className="md:w-[45%]">
                    <FormLabel className="font-medium">Poids</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Poids"
                        className="text-black"
                        {...field}
                        type="number"
                        min={50}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
              <FormField
                control={control}
                name="practiceLevel"
                render={({ field }) => (
                  <FormItem className="md:w-[45%]">
                    <FormLabel className="font-medium">
                      Niveau de pratique
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Niveau de pratique"
                        className="text-black"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="category"
                render={({ field }) => (
                  <FormItem className="md:w-[45%]">
                    <FormLabel className="font-medium capitalize">
                      Catégorie
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Catégorie"
                        className="text-black"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Previous clubs */}
            <div className="space-y-3">
              <FormLabel className="font-medium">Precedents club</FormLabel>
              {/* Club 1 */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
                <FormItem className="md:w-[25%]">
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Debut"
                      className="text-black"
                      value={club1.start}
                      onChange={(e) =>
                        setClub1((prev) => {
                          return { ...prev, start: e.target.value };
                        })
                      }
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
                <FormItem className="md:w-[25%]">
                  <FormControl>
                    <Input
                    type="number"
                      placeholder="Fin"
                      className="text-black"
                      value={club1.end}
                      onChange={(e) =>
                        setClub1((prev) => {
                          return { ...prev, end: e.target.value };
                        })
                      }
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
                <FormItem className="md:w-[45%]">
                  <FormControl>
                    <Input
                      placeholder="Club"
                      className="text-black"
                      value={club1.name}
                      onChange={(e) =>
                        setClub1((prev) => {
                          return { ...prev, name: e.target.value };
                        })
                      }
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              </div>

              {/* Club 2 */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
                <FormItem className="md:w-[25%]">
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Debut"
                      className="text-black"
                      value={club2.start}
                      onChange={(e) =>
                        setClub2((prev) => {
                          return { ...prev, start: e.target.value };
                        })
                      }
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
                <FormItem className="md:w-[25%]">
                  <FormControl>
                    <Input
                    type="number"
                      placeholder="Fin"
                      className="text-black"
                      value={club2.end}
                      onChange={(e) =>
                        setClub2((prev) => {
                          return { ...prev, end: e.target.value };
                        })
                      }
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
                <FormItem className="md:w-[45%]">
                  <FormControl>
                    <Input
                      placeholder="Club"
                      className="text-black"
                      value={club2.name}
                      onChange={(e) =>
                        setClub2((prev) => {
                          return { ...prev, name: e.target.value };
                        })
                      }
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              </div>

              {/* Club 3 */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
                <FormItem className="md:w-[25%]">
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Debut"
                      className="text-black"
                      value={club3.start}
                      onChange={(e) =>
                        setClub3((prev) => {
                          return { ...prev, start: e.target.value };
                        })
                      }
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
                <FormItem className="md:w-[25%]">
                  <FormControl>
                    <Input
                    type="number"
                      placeholder="Fin"
                      className="text-black"
                      value={club3.end}
                      onChange={(e) =>
                        setClub3((prev) => {
                          return { ...prev, end: e.target.value };
                        })
                      }
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
                <FormItem className="md:w-[45%]">
                  <FormControl>
                    <Input
                      placeholder="Club"
                      className="text-black"
                      value={club3.name}
                      onChange={(e) =>
                        setClub3((prev) => {
                          return { ...prev, name: e.target.value };
                        })
                      }
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              </div>
            </div>
          </>
        )}

        {!next && (
          <div className="flex justify-between items-center">
            <Link href="/payment" className="text-secondary-hover">
              Déjà enregistré
            </Link>
            {isLoading ? (
              <LoadingButton />
            ) : (
              <Button type="button" onClick={() => setNext(true)}>
                Suivant
              </Button>
            )}
          </div>
        )}
        {next && (
          <div className="flex justify-between items-center">
            {!isLoading && (
              <Button type="button" onClick={() => setNext(false)}>
                Retour
              </Button>
            )}

            {isLoading ? (
              <LoadingButton />
            ) : (
              <Button type="submit">Soumettre</Button>
            )}
          </div>
        )}
      </form>
    </Form>
  );
}
