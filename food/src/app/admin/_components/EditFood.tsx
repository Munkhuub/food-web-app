// import { Button } from "@/components/ui/button";
// import { Pencil } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import axios from "axios";

// const handleUpdate = async () => {};
// const [loading, setLoading] = {false}
// const [foodName, setFood]
// try {
// setLoading(true);

// await axios.put("http://localhost:3001/food/oneFood", {
//     foodName,
//     price: Number(price),
//     image: deployedImg,
//     ingredients,
// })
// }
// export const EditFood = () => {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button
//           className="absolute rounded-full right-9 top-[81px] bg-white size-11"
//           size="icon"
//         >
//           <Pencil className="text-[#EF4444] size-4" />
//         </Button>
//       </DialogTrigger>

//       <DialogContent className="sm:max-w-[472px]">
//         <DialogHeader>
//           <DialogTitle>Dishes info</DialogTitle>
//         </DialogHeader>

//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="name" className="text-right">
//               Dish name
//             </Label>
//             <Input id="name" value="Pedro Duarte" className="col-span-3" />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="username" className="text-right">
//               Dish category
//             </Label>
//             <Input id="username" value="@peduarte" className="col-span-3" />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="username" className="text-right">
//               Ingredients
//             </Label>
//             <Input id="username" value="@peduarte" className="col-span-3" />
//           </div>
//         </div>

//         <DialogFooter>
//           <Button type="submit">Save changes</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };
